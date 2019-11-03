import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
import './NotePageMain.css'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import PropTypes from 'prop-types';
import config from '../config';

export default class NotePageMain extends React.Component {
  // static defaultProps = {
  //   match: {
  //     params: {}
  //   }
  // }
  static contextType = ApiContext

  handleDeleteNote = noteId => {
    // const { noteId } = this.props.match.params
    //GIVES PROBLEMS BECAUSE IT DELETES FROM DB BUT THE SHELL REMAINS

        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.then(error => {
                        throw error
                    })
                }
                return res
            })
            .then((data) => {
                this.props.history.push('/');
            })
            .then((noteId) => {
              this.context.deleteNote(noteId); //THERE IS A PROBLEM HERE. I HAVE TO REFRESH
            })
            .catch(error => {
                console.error(error)
            })
  }
  
  constructor(props) {
      super(props)
      this.state = {
          id: '',
          n_name: '',
          modified: '',
          content: '',
          folderid: ''
      }
  }
  
    componentDidMount() {
      const { noteId } = this.props.match.params
      fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
          method: 'GET',
          header: {
              'content-type': 'application/json'
          }
      })
          .then(res => {
              if (!res.ok) {
                  return res.json().then(error => {
                      throw error
                  })
              }
              return res.json()
          })
          .then(res => {
              this.setState({
                  id: noteId,
                  n_name: res.n_name,
                  content: res.content,
                  modified: res.modified,
                  folderid: res.folderid
              })
          })
    }
  

  render() {
    
    return (
      <ErrorBoundary>
      <section className='NotePageMain'>
        <Note
          id={this.state.id}
          n_name={this.state.n_name}
          modified={this.state.modified}
          // onDeleteNote={this.handleDeleteNote}
          deleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          {this.state.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
          
        </div>
      </section>
      </ErrorBoundary>
    )
  }
}

NotePageMain.propTypes = {
  match: PropTypes.object
}