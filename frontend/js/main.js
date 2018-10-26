document.addEventListener('DOMContentLoaded', () => {

  //////////////////////////////////////// display icons
  function displayNotepadIcon() {
    const note = {
      name: 'Untitled',
      content: '',
      id: 0
    }
    new Note(note)
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
  generateAllNotes()
  createStartButton()
})
