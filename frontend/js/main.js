document.addEventListener('DOMContentLoaded', () => {
  function displayNotepadIcon() {
    const note = {
      name: 'Untitled',
      content: ''
    }
    new Icon(note)
  }

  function displayAllNoteIcons() {
    fetch('http://localhost:3000/notes')
    .then(r => r.json())
    .then(notes => {
      notes.forEach((note) => {
        new Icon(note)
      })
    })
  }

  displayNotepadIcon()
  displayAllNoteIcons()
})
