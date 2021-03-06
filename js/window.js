const allWindows = []

const windowContainer = document.querySelector('.window-container')

class Window {

  constructor(note) {
    allWindows.push(this)
    this.note = note

    this.displayOnDOM() // sets this.div, this.dragger, this.controlButtonClose, this.form, this.contentInput, this.titleBar, this.file, this.fileMenu
    activeNote = this.note

    this.tab = new Tab(this)

    this.bringToFront()
  }
  ////////////////////////////////////////////////

  displayOnDOM() {
    this.div = document.createElement('div')
    this.div.className = 'note-window'
    this.div.dataset.id = this.note.id
    this.div.innerHTML = `
      <div class='dragger'>
        <span class='title-bar'>${this.note.name} - Notepad</span>
      </div>

      <div class='control-buttons'>
        <div class='control-button-close'></div>
      </div>

      <div class='file'></div>
      <div class='file-menu'></div>

      <div class='note-display'>
        <form>
          <textarea>${this.note.content}</textarea>
        </form>
      </div>
    `
    windowContainer.appendChild(this.div)

    this.dragger = this.div.querySelector('.dragger')
    this.controlButtonClose = this.div.querySelector('.control-button-close')
    this.form = this.div.querySelector('form')
    this.contentInput = this.div.querySelector('textarea')
    this.titleBar = this.div.querySelector('.title-bar')
    this.indicateSavedStatus()
    this.file = this.div.querySelector('.file')
    this.fileMenu = this.div.querySelector('.file-menu')

    this.makeBringToFrontable()
    this.makeDraggable()
    this.makeCloseable()
    new Menu(this.file, this.fileMenu)
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
      // if (parseInt(this.div.style.top) !== 0)
      const newX = this.div.offsetLeft - changeX
      const newY = this.div.offsetTop - changeY

      if (newX >= 0 &&
          newY >= 0 &&
          newX <= iconContainer.offsetWidth - this.dragger.offsetWidth &&
          newY <= iconContainer.offsetHeight - this.dragger.offsetHeight) {
        this.div.style.top = newY + 'px'
        this.div.style.left = newX + 'px'
      }
      // if (this.div.offsetLeft - changeX >= 0) {
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
    this.div.remove() // remove from dom
    this.tab.deleteOnDOM()

    const index = allWindows.indexOf(this)
    allWindows.splice(index, 1) // remove object

    this.note.window = null
    activeNote = null // update Note object
  }

  makeBringToFrontable() {
    this.div.addEventListener('mousedown', () => {
      activeNote = this.note
      this.bringToFront()
    })
  }
  bringToFront() {
    activeNote = this.note // make active for save

    const index = allWindows.indexOf(this)
    allWindows.splice(index, 1)
    allWindows.push(this)
    this.setZIndices() // set z index

    this.styleAllOff()
    this.styleOn()
  }
  setZIndices() {
    allWindows.forEach((windowObj) => {
      const zIndex = allWindows.indexOf(windowObj)
      windowObj.div.style.zIndex = `${zIndex}`
    })
  }

  styleAllOff() {
    allWindows.forEach((windowObj) => {
      windowObj.div.classList.remove('on')
      if (windowObj.tab) {
        windowObj.tab.div.classList.remove('on')
      }
    })
  }
  styleOn() {
    this.div.classList.add('on')
    if (this.tab) {
      this.tab.div.classList.add('on')
    }
  }

  isSaved() {
    return this.contentInput.value === this.note.content
  }
  indicateSavedStatus() {
    this.contentInput.addEventListener('input', (e) => {
      if (this.isSaved()) {
        this.markSaved()
        this.tab.markSaved()

      } else {
        this.markNotSaved()
        this.tab.markNotSaved()
      }
    })
  }
  markSaved() {
    this.titleBar.innerHTML = `
      ${this.note.name} - Notepad
    `
  }
  markNotSaved() {
    this.titleBar.innerHTML = `
      ${this.note.name}* - Notepad
    `
  }
}
