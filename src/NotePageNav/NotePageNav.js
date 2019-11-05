import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { findNote, findFolder } from '../notes-helpers'
import './NotePageNav.css'
import PropTypes from 'prop-types';
import config from '../config';

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  constructor(props) {
    super(props)
    this.state = {
        id: '',
        f_name: ''
    }
  }

  componentDidMount() {
    const { noteId } = this.props.match.params
    console.log(noteId)
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
                id: res.folderid,
            })
        })
  }

  render() {
    const { notes, folders, } = this.context
    const { noteId } = this.props.match.params
    
    const folder = findFolder(folders, this.state.id)
    
    return (
      <div className='NotePageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </CircleButton>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.f_name}
          </h3>
        )}
      </div>
    )
  }
}

NotePageNav.propTypes = {
  match: PropTypes.object
}
