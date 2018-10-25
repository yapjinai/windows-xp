document.addEventListener('DOMContentLoaded', () => {

  const iconContainer = document.querySelector('.icon-container')

  ////////////////////////////////////// add double click event listener
  function makeDoubleClickable() {
    document.addEventListener('dblclick', (event) => {
      if ( //////////////////////// if clicking on existing note
        event.target.className === 'note-icon' ||
          (event.target.parentElement &&
          event.target.parentElement.className === 'note-icon')) {

        const noteId = event.target.dataset.id || event.target.parentElement.dataset.id
        const windowAlreadyExists = allWindows.find((window) => {
          return window.id === parseInt(noteId)
        })

        if (windowAlreadyExists) {
          console.log('already exists');
        }
        else {
          createWindow(event.target.dataset.id || event.target.parentElement.dataset.id)
        }
      }
      else if ( //////////////////// if clicking on notepad icon
        event.target.className === 'notepad-icon' ||
          (event.target.parentElement &&
          event.target.parentElement.className === 'notepad-icon')) {
        const note = {
          name: 'Untitled',
          content: ''
        }
        new Window(note)
      }
    })
  }
  makeDoubleClickable()

////////////////////////////////////// display all note icons
  function getAllNoteIcons() {
    fetch('http://localhost:3000/notes')
    .then(r => r.json())
    .then(notes => {
      notes.forEach((note) => {
        displayNoteIcon(note)
      })
    })
  }
  getAllNoteIcons()

  function displayNoteIcon(note) {
    const noteLi = document.createElement('li')
    noteLi.setAttribute('class', 'note-icon')
    noteLi.dataset.id = note.id
    noteLi.innerHTML = `
      <img src='images/notepad-icon.png'><br>
      <span>${note.name}</span>
    `
    iconContainer.appendChild(noteLi)
  }

////////////////////////////////////// open note window
  function createWindow(noteId) {
    fetch(`http://localhost:3000/notes/${noteId}`)
    .then(r => r.json())
    .then(note => {
      new Window(note)
    })
  }

})
