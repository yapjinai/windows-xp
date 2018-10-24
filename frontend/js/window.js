const windowContainer = document.querySelector('.window-container')

class Window {
  constructor(note) {
    this.id = note.id
    this.name = note.name
    this.content = note.content
    this.openWindow()

    this.window = windowContainer.querySelector(`[data-id="${this.id}"]`)
    this.dragger = this.window.querySelector('.dragger')
    this.controlButtonClose = this.window.querySelector('.control-button-close')

    this.makeDraggable()
    this.makeCloseable()
  }

  openWindow() {
    const noteWindow = document.createElement('div')
    noteWindow.className = 'note-window'
    noteWindow.dataset.id = this.id

    noteWindow.innerHTML = `
      <div class="dragger">
        <span>${this.name} - Notepad</span>
      </div>

      <div class="control-buttons">
        <div class="control-button-close"></div>
      </div>

      <div class="note-display">
        <form id="new-note-form">
          <textarea id="content">${this.content}</textarea>
          <button>Save</button>
        </form>
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
      this.window.style.top = (this.window.offsetTop - pos2) + "px"
      this.window.style.left = (this.window.offsetLeft - pos1) + "px"
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
    })
  }
}
