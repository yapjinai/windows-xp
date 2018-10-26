const allNotes = []
let activeNote

class Note {

  constructor(noteInfo) {
    allNotes.push(this)
    activeNote = this

    this.updateFront(noteInfo)
    this.createIcon() // this.icon
    // this.window // get after opening window
  }

  ////////////////////////////////////////////////
  // Note backend
  ////////////////////////////////////////////////
  confirmSave() {
    this.name = prompt('Please enter file name:', this.name)
    this.update()
  }
    //
    // save() {
    //   if (this.id > 0) { // if note already exists
    //       this.update()
    //     }
    //     else { // if new note
    //       this.create()
    //     }
    //   }
  create() {
    fetch(`http://localhost:3000/notes`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.name,
        content: this.window.contentInput.value
      })
    })
    .then(r => r.json())
    .then(noteInfo => {
      this.updateFront(noteInfo)
      this.createIcon()
      this.updateWindow()
    })
  }

  update() {
    fetch(`http://localhost:3000/notes/${this.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.name,
        content: this.window.contentInput.value
      })
    })
    .then(r => r.json())
    .then(noteInfo => {
      this.updateFront(noteInfo)
      this.updateIcon()
      this.updateWindow()
    })
  }
  delete() {
    fetch(`http://localhost:3000/notes/${this.id}`, {
      method: 'DELETE'
    })
    .then(() => {
      this.deleteFront()
      this.deleteIcon()
      // delete window?
    })
  }

  ////////////////////////////////////////////////
  // Note frontend
  ////////////////////////////////////////////////
  updateFront(noteInfo) {
    this.name = noteInfo.name
    this.content = noteInfo.content
    this.id = noteInfo.id
  }
  deleteFront() {
    const index = allNotes.indexOf(this)
    allNotes.splice(index, 1)
  }

  ////////////////////////////////////////////////
  // Icon
  ////////////////////////////////////////////////
  createIcon() {
    this.icon = new Icon(this)
  }
  updateIcon() {
    this.icon.updateOnDOM()
  }
  deleteIcon() {
    this.icon.deleteOnDOM()
  }

  ////////////////////////////////////////////////
  // Window
  ////////////////////////////////////////////////
  createWindow() {
    activeNote = this
    this.window = new Window(this)
  }
  updateWindow() {
    this.window.markSaved()
  }

  // delete window
}
