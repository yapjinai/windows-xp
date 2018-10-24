document.addEventListener('DOMContentLoaded', () => {

  const noteLinks = document.querySelector('.note-links')
  
////////////////////////////////////// add double click event listener
  document.addEventListener('dblclick', (event) => {
    if(
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
        fetchNote(event.target.dataset.id || event.target.parentElement.dataset.id)
      }
    }
    else if(
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
    noteLinks.appendChild(noteLi)
  } //END OF FUNCTION

////////////////////////////////////// open note window
  function fetchNote(noteId) {
    fetch(`http://localhost:3000/notes/${noteId}`)
    .then(r => r.json())
    .then(note => {
      new Window(note)
    })
  }

///////////////////////////////////////////////////////
// // GET NOTEPAD WORKING
  // function displayNotepad() {
  //   titleField.value = ''
  //   contentField.value = ''
  // } //END OF FUNCTION

///////////////////////////////////////////////////////
  // EDIT THIS
//   function addSubmitEventListener() {
//
//     newNoteForm.addEventListener('submit', (event) => {
//       event.preventDefault()
//
//       const newTitle = event.target.title.value
//       const newInput = event.target.content.value
//
//       const newNoteLi = document.createElement('li')
//       newNoteLi.setAttribute('class', 'note-icon')
//       newNoteLi.innerHTML = `
//         <img src='images/notepad-icon.png'><br>
//         <span>${newTitle}</span>
//       `
//
//       fetch('http://localhost:3000/notes', {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           name: newTitle,
//           content: newInput
//         })
//       })
//       .then(response => {
//         return response.json()
//       })
//       .then(data => {
//         console.log(data)
//       })
//
//       fetch('http://localhost:3000/notes')
//       .then(response => {
//         return response.json()
//       })
//       .then(data => {
//         console.log(data)
//       })
//
//       newNoteForm.reset()
//       noteLinks.appendChild(newNoteLi)
//     }) //END OF SUBMIT ADDEVENTLISTENER
//   }
//
})
