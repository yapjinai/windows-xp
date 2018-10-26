const windowContainer = document.querySelector('.window-container')

let allWindows = []
let anonymousIds = -1
let activeWindow

class Window {

  constructor(note) {
    allWindows.push(this)
    activeWindow = this

    this.note = note
    this.id = this.note.id || anonymousIds--
    this.open()

    this.window = windowContainer.querySelector(`[data-id='${this.id}']`)
    this.makeBringToFrontable()

    this.dragger = this.window.querySelector('.dragger')
    this.makeDraggable()

    this.controlButtonClose = this.window.querySelector('.control-button-close')
    this.makeCloseable()

    this.form = this.window.querySelector('form')
    this.contentInput = this.window.querySelector('textarea')
    // this.makeSaveable()

    this.titleBar = this.window.querySelector('.title-bar')
    this.indicateSavedStatus()

    // this.deleteButton = this.window.querySelector('.delete')
    // this.makeDeleteable()

    this.file = this.window.querySelector('.file')
    this.fileMenu = this.window.querySelector('.file-menu')
    new Menu(this.file, this.fileMenu)
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////

  icon() {
    return allIcons.find((icon) => icon.id() === this.id)
  }
  name() {
    return this.note.name
  }
  content() {
    return this.note.content
  }

  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////

  open() {
    const noteWindow = document.createElement('div')
    noteWindow.className = 'note-window'
    noteWindow.dataset.id = this.id
    noteWindow.innerHTML = `
      <div class='dragger'>
        <span class='title-bar'>${this.name()} - Notepad</span>
      </div>

      <div class='control-buttons'>
        <div class='control-button-close'></div>
      </div>

      <div class='file'></div>
      <div class='file-menu'></div>

      <div class='note-display'>
        <form>
          <textarea>${this.content()}</textarea>
          <!-- <button>Save</button> -->
        </form>
        <!-- <button class='delete'>Delete</button> -->
      </div>
    `

    windowContainer.appendChild(noteWindow)
  }

  makeDraggable() {
    let changeX = 0, changeY = 0, posX = 0, posY = 0

    this.dragger.addEventListener('mousedown', dragMouseDown.bind(this))

    const boundElementDrag = elementDrag.bind(this)
    const boundCloseDragElement = closeDragElement.bind(this)

    function dragMouseDown(e) {
      e.preventDefault()
      // get the mouse cursor position at startup:
      posX = e.clientX
      posY = e.clientY
      document.addEventListener('mouseup', boundCloseDragElement)
      // call a function whenever the cursor moves:
      document.addEventListener('mousemove', boundElementDrag)
    }

    function elementDrag(e) {
      e.preventDefault()
      // calculate the new cursor position:
      changeX = posX - e.clientX
      changeY = posY - e.clientY
      posX = e.clientX
      posY = e.clientY
      // set the element's new position:
      // if (parseInt(this.window.style.top) !== 0)
      const newX = this.window.offsetLeft - changeX
      const newY = this.window.offsetTop - changeY

      if (newX >= 0 &&
          newY >= 0 &&
          newX <= iconContainer.offsetWidth - this.dragger.offsetWidth &&
          newY <= iconContainer.offsetHeight - this.dragger.offsetHeight) {
        this.window.style.top = newY + 'px'
        this.window.style.left = newX + 'px'
      }
      // if (this.window.offsetLeft - changeX >= 0) {
      // }
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.removeEventListener('mouseup', boundCloseDragElement)
      document.removeEventListener('mousemove', boundElementDrag)
    }
  }

  makeCloseable() {
    this.controlButtonClose.addEventListener('click', () => {
      this.confirmClose()
    })
  }
  confirmClose() {
    if (!this.isSaved()) {
      if (confirm('Close without saving?')) {
        this.close()
      }
    }
    else {
      this.close()
    }
  }
  close() {
    activeWindow = null
    this.window.parentElement.removeChild(this.window)
    allWindows = allWindows.filter((window) => {
      return window.id !== this.id
    })
  }

  makeSaveable() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.confirmSaveNote()
    })
  }
  confirmSaveNote() {
    this.note.name = prompt('Please enter file name:', this.name());
    this.saveNote()
  }
  saveNote() {
    if (this.id > 0) { // if note already exists
        this.updateNote()
      }
      else { // if new note
        this.createNote()
      }
    }
  updateNote() {
      fetch(`http://localhost:3000/notes/${this.id}`, {
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
        .then(note => {
          this.note = note
          this.id = note.id
          this.markSaved()
          this.icon().update()
        })
      }
  createNote() {
    fetch(`http://localhost:3000/notes`, {
      method: 'POST',
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
      .then(note => {
        this.note = note
        this.id = note.id
        this.markSaved()

        // display icon
        new Icon(this.note)
      })
  }

  makeDeleteable() {
    this.deleteButton.addEventListener('click', (event) => {
      event.preventDefault()
      this.close() // delete window object
      this.deleteNote() // delete note from backend
      this.icon().confirmDeleteIcon()
    })
  }
  deleteNote() {
    fetch(`http://localhost:3000/notes/${this.id}`, {
      method: 'DELETE'
    })
  }

  makeBringToFrontable() {
    this.window.addEventListener('mousedown', () => {
      activeWindow = this
      this.bringToFront()
    })
  }
  bringToFront() {
    allWindows = allWindows.filter((window) => {
      return window.id !== this.id
    })
    allWindows.push(this)
    this.setZIndices()
  }
  setZIndices() {
    allWindows.forEach((windowObj) => {
      const zIndex = allWindows.indexOf(windowObj)
      windowObj.window.style.zIndex = `${zIndex}`
    })
  }

  isSaved() {
    return this.contentInput.value === this.content()
  }
  indicateSavedStatus() {
    this.contentInput.addEventListener('input', (e) => {
      if (this.isSaved()) {
        this.markSaved()
      } else {
        this.markNotSaved()
      }
    })
  }
  markSaved() {
    this.titleBar.innerHTML = `
      ${this.name()} - Notepad
    `
  }
  markNotSaved() {
    this.titleBar.innerHTML = `
      ${this.name()}* - Notepad
    `
  }
}
