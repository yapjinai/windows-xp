document.addEventListener('DOMContentLoaded', () => {

  const noteLinks = document.querySelector('.note-links')
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
    noteLi.setAttribute('class', 'note-icon')
    noteLi.dataset.id = note.id
    noteLi.innerHTML = `
      <img src='images/notepad-icon.png'><br>
      <span>${note.name}</span>
    `
    noteLinks.appendChild(noteLi)
  } //END OF FUNCTION

// debugger
  function displayNote() {
    noteDisplay.innerHTML = noteToDisplay
  } //END OF FUNCTION

  function displayNotepad() {
    noteDisplay.innerHTML = `
      <textarea></textarea>
      <button>Save</button>
    `
  } //END OF FUNCTION

  document.addEventListener('dblclick', (event) => {
    console.log(event.target);
    if(event.target.className === 'note-icon' ||
      event.target.parentElement.className === 'note-icon') {
      noteToDisplay = event.target.dataset.id || event.target.parentElement.dataset.id
      // displayNote()

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
    }
    else if(event.target.className === 'notepad-icon' ||
      event.target.parentElement.className === 'notepad-icon') {
        displayNotepad()
    }
  }) //END OF DBCLICK ADDEVENTLISTENER

}) //END END
