import React from 'react'

export default React.createContext({
  notes: [],
  folders: [],
  addFolder: () => {},
  updateFolder: () => {},
  updateNote: () => {},
  addNote: () => {},
  deleteNote: () => {},
  retrieveAdjFolders: () => {}
})