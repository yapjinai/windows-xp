document.addEventListener('DOMContentLoaded', () => {

////////////////////////////////////// display all note icons

  function displayNotepadIcon() {
    const note = {
      name: 'Untitled',
      content: ''
    }
    new Icon(note)
  }
  displayNotepadIcon()

  function displayAllNoteIcons() {
    fetch('http://localhost:3000/notes')
    .then(r => r.json())
    .then(notes => {
      notes.forEach((note) => {
        new Icon(note)
      })
    })
  }
  displayAllNoteIcons()
  
})
