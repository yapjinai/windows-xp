document.addEventListener('DOMContentLoaded', () => {

  const noteLinks = document.querySelector('#note-links')

  // get all notes
  fetch('http://localhost:3000/notes')
    .then(r => r.json())
    .then(notes => {
      notes.forEach((note) => {
        displayNote(note)
      })
    })




////////////////// helpers
  function displayNote(note) {
    const noteLi = document.createElement('li')
    noteLi.setAttribute('class', 'note-name')
    noteLi.innerHTML = `
      ${note.name}
    `
    noteLinks.appendChild(noteLi)
  } //END OF FUNCTION

  document.findElementByClassName

}) //END END
