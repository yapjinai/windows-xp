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
  createBack() {
    fetch(`http://localhost:3000/notes`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.name,
        content: this.content,
        content: this.contentInput.value
      })
    })
    .then(r => r.json())
    .then(noteInfo => {
      this.updateFront(noteInfo)
      this.createIcon()
    })
  }
  updateBack() {
    fetch(`http://localhost:3000/nootes/${this.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.name(),
        content: this.contentInput.value
      })
    })
    .then(r => r.json())
    .then(noteInfo => {
      this.updateFront(noteInfo)
      this.updateIcon()
    })
  }
  deleteBack() {
    fetch(`http://localhost:3000/nootes/${this.id}`, {
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
    this.icon.update()
  }
  deleteIcon() {
    this.icon.delete()
  }

  ////////////////////////////////////////////////
  // Window
  ////////////////////////////////////////////////
  createWindow() {
    this.window = new Window(this)
  }
}
