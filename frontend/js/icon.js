// const allIcons = []

const iconContainer = document.querySelector('.icon-container')

class Icon {
  constructor(note) {
    // allIcons.push(this)
    this.note = note

    this.displayOnDOM() // sets this.li
  }
  ////////////////////////////////////////////////

  // read
  displayOnDOM() {
    this.li = document.createElement('li')
    this.li.setAttribute('class', 'note-icon')
    this.li.dataset.id = this.note.id
    if (this.note.isBlankWindow()) { //
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
    console.log(this.note.id);
    if (this.note.window) { // window already exists
      activeNote = this.note
      this.note.window.bringToFront()
    }
    else {
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
