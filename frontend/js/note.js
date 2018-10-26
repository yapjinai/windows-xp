const allNotes = []
let activeNote
// let blankNoteId = -1
// let blankIcon
const emptyNote = {
  name: 'Untitled',
  content: '',
  id: 0
}

class Note {
  constructor(noteInfo) {
    this.updateFront(noteInfo)
    this.createIcon() // this.icon
    // this.window // set after opening window
    allNotes.push(this)
  }

  ////////////////////////////////////////////////
  // Note backend
  ////////////////////////////////////////////////
  confirmSave() {
    const newName = prompt('Please enter file name:', this.name)
    if (newName) {
      this.name = newName
      this.update()
    }
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
      this.window.close()
    })
  }

  ////////////////////////////////////////////////
  // Note frontend
  ////////////////////////////////////////////////
  // isBlankWindow() {
  //   return this.id <= 0
  // }

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
    // if (this.isBlankWindow()) {
    //   blankIcon = this.icon
    // }
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
    this.window.tab.markSaved()
  }

  // delete window
}

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

class BlankNote extends Note {
  confirmSave() {
    const newName = prompt('Please enter file name:', this.name)
    if (newName) {
      this.newName = newName
      this.create()
    }
  }
  create() {
    fetch(`http://localhost:3000/notes`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.newName,
        content: this.window.contentInput.value
      })
    })
    .then(r => r.json())
    .then(noteInfo => {
      const newNote = new Note(noteInfo)
      newNote.window = this.window
      activeNote = newNote
      newNote.window.note = newNote
      this.window = null
      newNote.updateWindow()
    })
  }
}
