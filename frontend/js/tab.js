const tabContainer = document.querySelector('.tab-container')

// let allTabs = []
// let activeTab // set this to be tab of active window

class Tab {

  constructor(window) {
    // allTabs.push(this)
    // activeTab = this

    this.window = window
    this.name = window.name()
    this.id = window.id
    this.openTab()

    this.tab = tabContainer.querySelector(`[data-id='${this.id}']`)

    // this.titleBar = this.tab.querySelector('.title-bar')
    // this.indicateSavedStatus()
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////

  openTab() {
    const noteTab = document.createElement('div')
    noteTab.className = 'note-tab'
    noteTab.dataset.id = this.id
    noteTab.innerHTML = `
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

    tabContainer.appendChild(noteTab)
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
      // if (parseInt(this.tab.style.top) !== 0)
      const newX = this.tab.offsetLeft - changeX
      const newY = this.tab.offsetTop - changeY

      if (newX >= 0 &&
          newY >= 0 &&
          newX <= iconContainer.offsetWidth - this.dragger.offsetWidth &&
          newY <= iconContainer.offsetHeight - this.dragger.offsetHeight) {
        this.tab.style.top = newY + 'px'
        this.tab.style.left = newX + 'px'
      }
      // if (this.tab.offsetLeft - changeX >= 0) {
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
      this.confirmCloseTab()
    })
  }
  confirmCloseTab() {
    if (!this.isSaved()) {
      if (confirm('Close without saving?')) {
        this.closeTab()
      }
    }
    else {
      this.closeTab()
    }
  }
  closeTab() {
    activeTab = null
    this.tab.parentElement.removeChild(this.tab)
    allTabs = allTabs.filter((tab) => {
      return tab.id !== this.id
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
          this.icon().refreshIcon()
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
      this.closeTab() // delete tab object
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
    this.tab.addEventListener('mousedown', () => {
      activeTab = this
      this.bringToFront()
    })
  }
  bringToFront() {
    allTabs = allTabs.filter((tab) => {
      return tab.id !== this.id
    })
    allTabs.push(this)
    this.setZIndices()
  }
  setZIndices() {
    allTabs.forEach((tabObj) => {
      const zIndex = allTabs.indexOf(tabObj)
      tabObj.tab.style.zIndex = `${zIndex}`
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
