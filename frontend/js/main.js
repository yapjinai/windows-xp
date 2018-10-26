document.addEventListener('DOMContentLoaded', () => {

//   ////////////////////////////////////// display icons
//   function displayNotepadIcon() {
//     const note = {
//       name: 'Untitled',
//       content: '',
//       id: 0
//     }
//     new Icon(note)
//   }
//
//   function displayAllNoteIcons() {
//     fetch('http://localhost:3000/notes')
//     .then(r => r.json())
//     .then(notes => {
//       notes.forEach((note) => {
//         new Icon(note)
//       })
//     })
//   }
//
// ////////////////////////////////////////// start menu
//   const startButton = document.querySelector('.start-button')
//   const startMenu = document.querySelector('.start-menu')
//   new Menu(startButton, startMenu)
//
//   displayNotepadIcon()
//   displayAllNoteIcons()

///////////////////////// NOTE.JS
  // display notepad icon

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
    const startButton = document.querySelector('.start-button')
    const startMenu = document.querySelector('.start-menu')
    new Menu(startButton, startMenu)

    generateAllNotes()
})
