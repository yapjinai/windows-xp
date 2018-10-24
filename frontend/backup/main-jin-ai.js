document.addEventListener('DOMContentLoaded', () => {

  const body = document.querySelector('body')
  const noteLinks = document.querySelector('.note-links')

  // const nameField = document.querySelector('#name')
  // const contentField = document.querySelector('#content')

  // let noteToDisplay

  ////////////////////////////////////// get all notes
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
    noteLinks.appendChild(noteLi)
  } //END OF FUNCTION

  ////////////////////////////////////// open a window for a new note

  document.addEventListener('dblclick', (event) => {
    if(
      event.target.className === 'note-icon' ||
        (event.target.parentElement &&
        event.target.parentElement.className === 'note-icon')) {
      fetchNote(event.target.dataset.id || event.target.parentElement.dataset.id)
    }
    else if(
      event.target.className === 'notepad-icon' ||
        (event.target.parentElement &&
        event.target.parentElement.className === 'notepad-icon')) {
      const note = {
        name: '',
        content: ''
      }
      newWindow(note)
    }
  }) // end double click event listener

  function fetchNote(noteId) {
    fetch(`http://localhost:3000/notes/${noteId}`)
    .then(r => r.json())
    .then(note => {
      newWindow(note)
    })
  }

  function newWindow(note) {
    const noteWindow = new Window(note)
    // noteWindow.open()
  }



  //
  // function displayNotepad() {
  //   nameField.value = ''
  //   contentField.innerHTML = ''
  // } //END OF FUNCTION
  //
  //
  // const newNoteForm = document.getElementById('new-note-form')
  //
  // newNoteForm.addEventListener('submit', (event) => {
  //   event.preventDefault()
  //
  //   const name = document.getElementById('name')
  //   const content = document.getElementById('content')
  // }) //END OF SUBMIT ADDEVENTLISTENER
}) //END END
