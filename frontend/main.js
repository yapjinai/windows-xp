document.addEventListener('DOMContentLoaded', () => {

  const noteLinks = document.querySelector('#note-links')
  const noteDisplay = document.querySelector('.note-display')

  let noteToDisplay

  // get all notes
  fetch('http://localhost:3000/notes')
    .then(r => r.json())
    .then(notes => {
      notes.forEach((note) => {
        displayNoteIcon(note)
      })
    })

////////////////// helpers
  function displayNoteIcon(note) {
    const noteLi = document.createElement('li')
    noteLi.setAttribute('class', 'note-name')
    noteLi.dataset.id = note.id
    noteLi.innerHTML = `
      ${note.name}
    `
    noteLinks.appendChild(noteLi)
  } //END OF FUNCTION

// debugger
  function displayNote() {
    noteDisplay.innerHTML = noteToDisplay
  } //END OF FUNCTION

  document.addEventListener('click', (event) => {
    if(event.target.className === 'note-name') {
      noteToDisplay = event.target.dataset.id
      displayNote()
    }

    fetch(`http://localhost:3000/notes/${noteToDisplay}`)
    .then(r => r.json())
    .then(dataObj => {
      console.log(dataObj)

      const noteDisplay = document.querySelector('.note-display')

      noteDisplay.innerHTML = `
        Name: ${dataObj.name}<br>
        Content: ${dataObj.content}
      `
    })
  }) //END OF DBCLICK ADDEVENTLISTENER

}) //END END
