import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import './Note.css'



export default class Note extends React.Component {
  static defaultProps ={
    deleteNote: () => {},
    match: {
      params: {}
  }
  }
  static contextType = ApiContext;

  constructor(props) {
    super(props)
    this.deleteNoteRequest = this.deleteNoteRequest.bind(this)
  }
  deleteNoteRequest(e) {
    console.log('delete this', e)
    console.log(typeof(e))
    const noteId = e 
    
    fetch(`${config.API_ENDPOINT}/notes/${e}`, {
      method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
    })
    .then(res => {
      if (!res.ok) {
        // get the error message from the response,
        return res.json().then(error => {
          
          Promise.reject(error)
        })
      }
      return res.json()
    })
      .then((data) => {
          this.props.history.push('/');
          this.context.deleteNote(noteId);
      })
      .catch(error => {
          console.error(error)
      })

  }


  render() {
    const { n_name, id, modified } = this.props
    
    
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/notes/${id}`}>
            {n_name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={(e) => this.deleteNoteRequest(this.props.id)}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <p>
        
          <Link to={`/edit-note/${this.props.id}`}>
            update
          </Link>
        </p>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(modified, 'DD MM YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
