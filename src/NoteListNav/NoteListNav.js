import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
// import { countNotesForFolder } from '../notes-helpers'
import AddFolder from '../AddFolder/AddFolder'
import './NoteListNav.css'
import config from '../config';

export default class NoteListNav extends React.Component {
  static contextType = ApiContext;

  render() {
    const { folders=[], notes=[] } = this.context
    // const { noteId } = this.props.match.params
    // console.log(noteId)
    // // const folderList = noteId ? folders.find(folder => folder.id == note.folderid) : folders;

    const countNotesForFolder = (notes=[], number) =>
      notes.filter(note => note.folderid === number).length
   

    const mapping = folders.map(folder =>
      <li key={folder.id}>
        <NavLink
          className='NoteListNav__folder-link'
          to={`/folder/${folder.id}`}
        >
          <span className='NoteListNav__num-notes'>
            {countNotesForFolder(notes, folder.id)}  
          </span>
          {folder.f_name}
        </NavLink>
      </li>
    )
    
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
        {/* {folderList.length > 1 ? folderList.map(folder =>
                        <li
                            key={folder.id}
                            className="folder">
                            <NavLink
                                to={`/folder/${folder.id}`}
                            >
                                {folder.f_name}
                            </NavLink>
                        </li>
                    ) :
                        <li
                            key={folderList.id}
                            className="folder">
                            <NavLink
                                to={`/folder/${folderList.id}`}
                            >
                              {folderList.name}
                            </NavLink>
                        </li>
                    } */}
          {mapping}
        </ul>
        <div className='NoteListNav__button-wrapper'>
          <CircleButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Folder
          </CircleButton>
        </div>
      </div>
    )
  }
}
