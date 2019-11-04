import React, {Component} from 'react'
import ApiContext from '../ApiContext'
import config from '../config';


class EditNote extends Component {
    static contextType = ApiContext;


        state = {
            error: null,
            id: '',
            n_name: '',
            modified: null,
            content: '',
            folderid: 1
        }
    
    handleChangeName = (e) => {
        const d = new Date();
        // console.log(d);
        const date = d.toISOString();
        // console.log(date);
        this.setState({
            n_name : e.target.value,
            modified : date
        })
    }
    handleChangeContent = (e) => {
        this.setState({
            content : e.target.value
        })
    }
    handleChangeFolderName = (e) => {
        console.log(this.context.folders)
        const folderDeCui = e.target.value
        // console.log(folders.folders)
        const found = this.context.folders.find((element) => {
            return element.f_name === folderDeCui
        })
        console.log(found)
        this.setState({
            folder : e.target.value,
            folderid: found.id
        })
    }
    validateName = (e) => {
        console.log(this.state.n_name)
        const n_name = this.state.n_name.trim();
        if (n_name.length === 0) {
          window.alert ('Please name the note')
        } else if (n_name.length < 3) {
            window.alert ('Name must be at least 3 characters long')
        } else {this.validateContent(e)}
    }

    validateContent = (e) => {
        console.log(this.state.content)
        const content = this.state.content.trim();
        if (content.length === 0) {
            window.alert ('Please provide a description')
        } else if (content.length < 9) {
            window.alert ('Also the content must be at least 9 characters long')
        } else {this.validateFolder(e)}
    }

    validateFolder = (e) => {
        console.log(this.state.folder)
        if (this.state.folder === "") {
            window.alert ('Please choose an existing folder')
        } else {this.handleSubmit(e)}
    }


    validateInputs = (e) => {
        this.validateName(e);
       
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { noteId } = this.props.match.params
        console.log(noteId)
        const { n_name, content, modified } = this.state
        const newNote = { n_name, content, modified }

        // validation not shown
        fetch(config.API_ENDPOINT + `/notes/${noteId}`, {
                method: 'PATCH',
                body: JSON.stringify(newNote),
                headers: {
                    'content-type': 'application/json'
                },
        })
        .then(res => {
            if (!res.ok)
              return res.json().then(error => Promise.reject(error))
        })
        .then(() => {
            this.resetFields(newNote)
            this.context.updateNote(newNote)
            this.props.history.push('/')
        })
        .catch(error => {
            console.error(error)
            this.setState({ error })
        });
    }
    resetFields = (newFields) => {
        this.setState({
          n_name: newFields.n_name || '',
          content: newFields.content || '',
        })
    }
    handleClickCancel = () => {
        this.props.history.push('/')
    };

    componentDidMount() {
        const { noteId } = this.props.match.params
        console.log(this.props.match.params) 
        console.log(noteId)
        console.log(this.context)
        fetch(`https://localhost:8000/api/notes/${noteId}`, {
            method: 'GET'
        })
        .then(res => {
            if (!res.ok)
              return res.json().then(error => Promise.reject(error))
    
            return res.json()
        })
        .then(responseData => {
            console.log(responseData)
            this.setState({
                n_name: responseData.n_name,
                content: responseData.content,
                folder: responseData.folder,
                modified: null ///TO CHECK IF TO PUT NEW DATE
            })
        })
        .catch(error => {
            console.error(error)
            this.setState({ error })
        })
    }
    
    render() { 
        const { id, n_name, modified, content, folderid } = this.state

        const { className, ...otherProps } = this.props
        // console.log(this.context.folders)
        const foldersNames = this.context.folders.map(folder => 
        <option key={folder.id} value={folder.f_name}>{folder.f_name}</option>
        )
        console.log(foldersNames)
        return (
            <div>
                <form 
                    className={['Noteful-form', className].join(' ')}
                    action='#'
                    {...otherProps}
                    onSubmit={this.validateInputs}
                >
                    <h4>Update a Note</h4>
                    <label htmlFor='nameN'>Name</label>
                        <input type='text' id='nameN' placeholder="Note" onChange={this.handleChangeName} />
                    <label htmlFor='nameF'>Content</label>
                        <input type='text' id='nameC' placeholder="Description" onChange={this.handleChangeContent} />
                    <label htmlFor='choseF'>Folder</label>
                        <select id='choseF' onChange={this.handleChangeFolderName}>
                            <option value="" defaultValue="---">---</option>
                            {foldersNames} 
                        </select>
                    <button>Update note</button>
                </form>
            </div>
        );
    }
}
 
export default EditNote;