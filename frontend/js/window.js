const windowContainer = document.querySelector('.window-container')

let allWindows = []
let activeWindow

class Window {

  constructor(note) {
    allWindows.push(this)
    activeWindow = this

    this.id = note.id
    this.name = note.name
    this.content = note.content
    this.openWindow()

    this.window = windowContainer.querySelector(`[data-id='${this.id}']`)
    this.makeBringToFrontable()

    this.dragger = this.window.querySelector('.dragger')
    this.makeDraggable()

    this.controlButtonClose = this.window.querySelector('.control-button-close')
    this.makeCloseable()

    this.form = this.window.querySelector('form')
    this.contentInput = this.window.querySelector('textarea')
    this.makeSaveable()

    this.deleteButton = this.window.querySelector('.delete')
    this.makeDeleteable()
  }

  openWindow() {
    const noteWindow = document.createElement('div')
    noteWindow.className = 'note-window'
    noteWindow.dataset.id = this.id

    noteWindow.innerHTML = `
      <div class='dragger'>
        <span>${this.name} - Notepad</span>
      </div>

      <div class='control-buttons'>
        <div class='control-button-close'></div>
      </div>

      <div class='note-display'>
        <form>
          <textarea>${this.content}</textarea>
          <button>Save</button>
        </form>
        <button class="delete">Delete</button>
      </div>
    `

    windowContainer.appendChild(noteWindow)
  }

  makeDraggable() {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0

    this.dragger.addEventListener('mousedown', dragMouseDown.bind(this))

    const boundElementDrag = elementDrag.bind(this)
    const boundCloseDragElement = closeDragElement.bind(this)

    function dragMouseDown(e) {
      e.preventDefault()
      // get the mouse cursor position at startup:
      pos3 = e.clientX
      pos4 = e.clientY
      document.addEventListener('mouseup', boundCloseDragElement)
      // call a function whenever the cursor moves:
      document.addEventListener('mousemove', boundElementDrag)
    }

    function elementDrag(e) {
      e.preventDefault()
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX
      pos2 = pos4 - e.clientY
      pos3 = e.clientX
      pos4 = e.clientY
      // set the element's new position:
      this.window.style.top = (this.window.offsetTop - pos2) + 'px'
      this.window.style.left = (this.window.offsetLeft - pos1) + 'px'
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.removeEventListener('mouseup', boundCloseDragElement)
      document.removeEventListener('mousemove', boundElementDrag)
    }
  }

  makeCloseable() {
    this.controlButtonClose.addEventListener('click', () => {
      this.window.parentElement.removeChild(this.window)
      allWindows = allWindows.filter((window) => {
        return window.id !== this.id
      })
    })
  }

  makeSaveable() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.saveNote()
    })
  }

    saveNote() {
    if (this.id) { // if note already exists
      fetch(`http://localhost:3000/notes/${this.id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: this.contentInput.value
        })
      })
    }
    else { // if new note
      fetch(`http://localhost:3000/notes`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: this.contentInput.value
        })
      })
        .then(r => r.json())
        .then(note => {
          const noteLinks = document.querySelector('.note-links')
          const noteLi = document.createElement('li')
          noteLi.setAttribute('class', 'note-icon')
          noteLi.dataset.id = note.id
          noteLi.innerHTML = `
            <img src='images/notepad-icon.png'><br>
            <span>${note.name}</span>
          `
          noteLinks.appendChild(noteLi)
        })
    }
  }

  makeDeleteable() {
    //event listener
    this.deleteButton.addEventListener('click', (event) => {
      event.preventDefault()
      this.window.parentElement.removeChild(this.window) //close window
      this.deleteNote()
      this.removeNote()
    })
  }

  deleteNote() {
    //fetch
    fetch(`http://localhost:3000/notes/${this.id}`, {
      method: 'DELETE'
    })
  }

  removeNote() {
    //remove note from window container
    let allNotes = document.getElementsByClassName('note-icon')
    const removedNote = [...allNotes].find(note => parseInt(note.dataset.id) === this.id )
    removedNote.remove()
  }

  makeBringToFrontable() {
    this.window.addEventListener('mousedown', () => {
      activeWindow = this
      console.log(activeWindow);
      this.bringToFront()
    })
  }
    bringToFront() {
      console.log(this.id);
      // bring to front
    }
}

// TO DO:

// bringToFront => active window
// stop from going off page!!
// objectize Icon
// ctrl+S hotkey
// start bar
// delete
