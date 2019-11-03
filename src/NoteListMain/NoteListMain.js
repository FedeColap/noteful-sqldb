import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
// import { getNotesForFolder } from '../notes-helpers'
import './NoteListMain.css'
import PropTypes from 'prop-types';
import config from '../config';

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext
  // componentDidMount() {
  //   const { folderId } = this.props.match.params
  //   fetch(`${config.API_ENDPOINT}/notes`, {
  //       method: 'GET',
  //       header: {
  //           'content-type': 'application/json'
  //       }
  //   })
  //       .then(res => {
  //           if (!res.ok) {
  //               return res.json().then(error => {
  //                   throw error
  //               })
  //           }
  //           return res.json()
  //       })
  //       .then(res => {
  //           this.setState({
  //               id: res.id,
  //               n_name: res.n_name,
  //               content: res.content,
  //               modified: res.modified,
  //               folderid: res.folderid
  //           })
  //       })
  // }

  render() {
    const { notes } = this.context
    console.log(notes)
    const { folderId } = this.props.match.params
    console.log(folderId)
    console.log(typeof(folderId))
    const foldNumber = Number(folderId)
    console.log(foldNumber)
    console.log(typeof(foldNumber))
    const getNotesForFolder = (notes, foldNumber) => (
      (!folderId)
        ? notes
        : notes.filter(note => note.folderid === foldNumber)
    )
    
    
    const notesForFolder = getNotesForFolder(notes, foldNumber)
    
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                n_name={note.n_name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    )
  }
}

NoteListMain.propTypes = {
  match: PropTypes.object
}
