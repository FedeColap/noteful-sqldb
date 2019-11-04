import React, {Component} from 'react'
import ApiContext from '../ApiContext'
import config from '../config';
import PropTypes from 'prop-types';

class EditFolder extends Component {
    static contextType = ApiContext;

    state= {
        id: "",
        f_name: ""
    }
    handleChangeName = (e) => {
        this.setState({
            f_name : e.target.value
        })
    }
    validateName = (e) => {
        console.log(this.state.f_name)
        const f_name = this.state.f_name.trim();
        if (f_name.length === 0) {
            window.alert ('Please name the folder')
        } else if (f_name.length < 3) {
            window.alert ('The name of the folder must be at least 3 characters long')
        } else {this.handleSubmit(e)}
    }

    validateInputs = (e) => {
        this.validateName(e);  
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { folderId } = this.props.match.params
        console.log(folderId )
        
        const { id, f_name} = this.state
        console.log(e)
        const newFolder = { id, f_name}
        
        fetch(`${config.API_ENDPOINT}/folders/${folderId}`,{
            method: 'PATCH',
            body: JSON.stringify(newFolder),
            headers: {
            'content-type': 'application/json',
            }
        })
            .then((res) => {
                console.log(res)
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                } 
            })
            // .then(this.props.retrieveAdjFolders())
            .then(() => {
                this.resetFields(newFolder)
                this.context.updateFolder(newFolder)
                console.log(newFolder)
                this.props.history.push('/')
            })
            .catch(error => {
                console.error({error})
                this.setState({ error })
            });
    }
    resetFields = (newFields) => {
        this.setState({
            f_name: newFields.f_name || '',
        })
    }

    componentDidMount() {
        const { folderId } = this.props.match.params 
        console.log(folderId )
        fetch(`${config.API_ENDPOINT}/folders/${folderId}`, {
            method: 'GET'
        })
        .then(res => {
            if (!res.ok)
              return res.json().then(error => Promise.reject(error))
    
            return res.json()
        })
        .then(responseData => {
            this.setState({
                id: responseData.id,
                f_name: responseData.f_name,
            })
        })
        .catch(error => {
            console.error(error)
            this.setState({ error })
        })
    }
    
    render() { 
        const { className, ...otherProps } = this.props
        const {f_name} = this.state
        console.log(this.state)
        return (
            <div>
                <form 
                    className={['Noteful-form', className].join(' ')}
                    action='#'
                    {...otherProps}
                    onSubmit={this.validateInputs}
                >
                    <h4>Update a folder</h4>
                    <label htmlFor='nameF'>Name</label>
                        <input type='text' id='nameF' placeholder="Folder" value={f_name} onChange={this.handleChangeName} />
                    <button>Update Folder</button>
                </form>
            </div>
        );
    }
}
 
export default EditFolder;

EditFolder.defaultProps = {
    f_name: "New Folder"
};

EditFolder.propTypes = {
  f_name: PropTypes.string.isRequired
};