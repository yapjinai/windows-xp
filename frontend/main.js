document.addEventListener('DOMContentLoaded', () => {

  const noteLinks = document.querySelector('.note-links')
  const titleField = document.querySelector('#title')
  const contentField = document.querySelector('#content')

  let noteToDisplay

  // get all notes
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

////////////////// helpers
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

  function displayNote() {
    fetch(`http://localhost:3000/notes/${noteToDisplay}`)
    .then(r => r.json())
    .then(dataObj => {
      titleField.value = dataObj.name
      contentField.value = dataObj.content
    })
  } //END OF FUNCTION

  function displayNotepad() {
    titleField.value = ''
    contentField.value = ''
  } //END OF FUNCTION

  document.addEventListener('dblclick', (event) => {
    if(event.target.className === 'note-icon' || event.target.parentElement.className === 'note-icon') {
      noteToDisplay = event.target.dataset.id || event.target.parentElement.dataset.id

      // const editButton = document.createElement('button')
      // editButton.innerText = 'Update'
      // newNoteForm.appendChild(editButton)

      displayNote()
    }
    else if(event.target.className === 'notepad-icon' || event.target.parentElement.className === 'notepad-icon') {
        displayNotepad()
    }
  }) //END OF DBLCLICK ADDEVENTLISTENER

  const newNoteForm = document.getElementById('new-note-form')

  newNoteForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const newTitle = event.target.title.value
    const newInput = event.target.content.value

    const newNoteLi = document.createElement('li')
    newNoteLi.setAttribute('class', 'note-icon')
    newNoteLi.innerHTML = `
      <img src='images/notepad-icon.png'><br>
      <span>${newTitle}</span>
    `

    fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newTitle,
        content: newInput
      })
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
    })

    fetch('http://localhost:3000/notes')
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
    })

    newNoteForm.reset()
    noteLinks.appendChild(newNoteLi)

  }) //END OF SUBMIT ADDEVENTLISTENER

}) //END END
