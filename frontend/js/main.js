document.addEventListener('DOMContentLoaded', () => {

  //////////////////////////////////////// display icons
  function displayNotepadIcon() {
    new BlankNote(emptyNote)
  }
  function displayTrashIcon() {
    new Trash()
  }

  function generateAllNotes() {
    fetch('http://localhost:3000/notes')
    .then(r => r.json())
    .then(notes => {
      notes.forEach((note) => {
        new Note(note)
      })
    })
  }

  ////////////////////////////////////////// start menu
  function createStartButton() {
    const startButton = document.querySelector('.start-button')
    const startMenu = document.querySelector('.start-menu')
    new Menu(startButton, startMenu)
  }

  /////////////////////////////////////////// call functions
  displayNotepadIcon()
  displayTrashIcon()
  generateAllNotes()
  createStartButton()
})
