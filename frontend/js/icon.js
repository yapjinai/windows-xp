const iconContainer = document.querySelector('.icon-container')

let allIcons = []

class Icon {

  constructor(note) {
    allIcons.push(this)
    this.note = note

    this.displayOnDOM() // sets this.li
  }
  ////////////////////////////////////////////////
  
  // read
  displayOnDOM() {
    this.li = document.createElement('li')
    this.li.setAttribute('class', 'note-icon')
    this.li.dataset.id = this.note.id
    if (this.note.id === 0) {
      this.li.innerHTML = `
      <img src='images/notepad-icon.png'><br>
      <span>Notepad</span>
      `
    }
    else {
      this.li.innerHTML = `
        <img src='images/notepad-icon.png'><br>
        <span>${this.note.name}</span>
      `
    }
    iconContainer.appendChild(this.li)

    this.makeDoubleClickable()
  }

  makeDoubleClickable() {
    this.li.addEventListener('dblclick', (event) => {
      this.doubleClick()
    })
  }
  doubleClick() {
    if (this.note.window) {
      activeNote = this.note
      this.note.window.bringToFront()
    }
    else {
      console.log(1);
      this.note.createWindow()
    }
  }

  // update
  updateOnDOM() {
    this.li.innerHTML = `
      <img src='images/notepad-icon.png'><br>
      <span>${this.note.name}</span>
    `
  }

  // delete
  deleteOnDOM() {
    this.li.remove()
  }
}
