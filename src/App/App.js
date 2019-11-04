import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext';
import AddFolder from '../AddFolder/AddFolder'
import EditFolder from '../EditFolder/EditFolder'
import AddNote from '../AddNote/AddNote'
import EditNote from '../EditNote/EditNote'
import config from '../config';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    
    updateFolder = updatedFolder => {
        console.log(typeof(updatedFolder))
        const newFolders = this.state.folders.map(fd =>
          (fd.id === updatedFolder.id) ? updatedFolder : fd
        )
        console.log(newFolders)
        this.setState({
            folders: newFolders
        })
        console.log(this.state.folders)
    };
    

    updateNote = updatedNote => {
        this.setState({
            notes: this.state.notes.map(nt =>
              (nt.id !== updatedNote.id) ? nt : updatedNote
            )
          })

    }

    addFolder = folder => {
        this.setState({
            folders: [...this.state.folders, folder],
        })
    }
    addNote = note => {
        this.setState({
            notes: [...this.state.notes, note],
        })
    }

    retrieveAdjFolders = () => {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
        });
    }

    componentDidMount() {
        this.retrieveAdjFolders()
    }

    deleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };
   

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
                <Route 
                    path="/edit-folder/:folderId" 
                    render={(props) => <NoteListNav {...props} />}
                />
                <Route 
                    path="/edit-note/:noteId" 
                    render={(props) => <NotePageNav {...props} />}
                />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageMain} />
                <Route path="/add-folder" component={AddFolder} />
                <Route 
                    path="/edit-folder/:folderId" 
                    render={(props) => <EditFolder {...props} />}
                />
                <Route path="/add-note" component={AddNote} />
                <Route 
                    path="/edit-note/:noteId" 
                    render={(props) => <EditNote {...props} />}
                />
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            // deleteNote: this.handleDeleteNote,
            deleteNote:this.deleteNote,
            addFolder: this.addFolder,
            addNote: this.addNote,
            updateFolder: this.updateFolder,
            updateNote: this.updateNote
        };
        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                   
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                <ErrorBoundary>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </ErrorBoundary>
                </div>
            </ApiContext.Provider>
        );
    }
}

export default App;