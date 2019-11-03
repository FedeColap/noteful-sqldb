import React, {Component} from 'react'
import ApiContext from '../ApiContext'
// import Option from './Option'
import config from '../config';

class AddNote extends Component {
    static contextType = ApiContext;

    state= {
        n_name: '',
        content: '',
        folderid: '',
        modified: null
    }
    handleName = (e) => {
        const d = new Date();
        console.log(d);
        const date = d.toISOString();
        console.log(date);
        this.setState({
            n_name : e.target.value,
            modified : date
        })
    }
    handleContent = (e) => {
        this.setState({
            content : e.target.value
        })
    }
    handleFolderName = (e) => {

       console.log(this.context.folders)
       
        const folderDeCui = e.target.value
        // console.log(folders.folders)
        const found = this.context.folders.find((element) => {
            return element.f_name === folderDeCui
        })
        console.log(found.id)

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
        // const d = new Date();
        // console.log(d);
        // const date = d.toISOString();
        // console.log(date);
        // this.setState({
        //     modified : date // THIS HAS TO BE REVIEWED <--------------------
        // })
        e.preventDefault();
        

        // const d = new Date();
        // const date = d.toISOString();
        // this.setState({
        //     modified : date // THIS HAS TO BE REVIEWED <--------------------
        // })
        // console.log(typeof(d))

        console.log(this.state)
       
        let data = this.state
       
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
            'content-type': 'application/json',
            }
        })
            
            .then((res) => {
                if (!res.ok) {
                    return res.json().then(error => {
                        // then throw it
                        throw error
                    });
                } return res.json()
            })

            .then(data => {
                this.props.history.push('/')
                this.context.addNote(data)
            })
            .catch(error => {
                console.error({error});
            });
    }
    
    render() { 
        const { className, ...otherProps } = this.props
        // console.log(this.context.folders)
        const foldersNames = this.context.folders.map(folder => 
        <option key={folder.id} value={folder.f_name}>{folder.f_name}</option>
        )
        // console.log(foldersNames)
        return (
            <div>
                <form 
                    className={['Noteful-form', className].join(' ')}
                    action='#'
                    {...otherProps}
                    onSubmit={this.validateInputs}
                >
                    <h4>Create a Note</h4>
                    <label htmlFor='nameN'>Name</label>
                        <input type='text' id='nameN' placeholder="Note" onChange={this.handleName} />
                    <label htmlFor='nameF'>Content</label>
                        <input type='text' id='nameC' placeholder="Description" onChange={this.handleContent} />
                    <label htmlFor='choseF'>Folder</label>
                        <select id='choseF' onChange={this.handleFolderName}>
                            <option value="" defaultValue="---">---</option>
                            {foldersNames} 
                        </select>
                    <button>Add note</button>
                </form>
            </div>
        );
    }
}
 
export default AddNote;