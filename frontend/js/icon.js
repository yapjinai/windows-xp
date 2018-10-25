const iconContainer = document.querySelector('.icon-container')

let allIcons = []

class Icon {

  constructor(note) {
    allIcons.push(this)

    this.note = note
    this.li = this.displayIcon()

    this.makeDoubleClickable()
    // this.makeDraggable()
    // this.makeDeleteable()
  }
  window() {
    return allWindows.find((window) => window.id === this.id())
  }
  id() {
    return this.note.id
  }
  name() {
    return this.note.name
  }

  // read
  displayIcon() {
    const iconLi = document.createElement('li')
    iconLi.setAttribute('class', 'note-icon')
    iconLi.dataset.id = this.id()
    iconLi.innerHTML = `
      <img src='images/notepad-icon.png'><br>
      <span>${this.name()}</span>
    `
    iconContainer.appendChild(iconLi)
    return iconLi
  }

  makeDoubleClickable() {
    this.li.addEventListener('dblclick', (event) => {
      this.doubleClick()



    })
  }
    doubleClick() {
      const noteId = this.id()

      if (this.window()) {
        activeWindow = this.window()
        console.log('Window already open');
      }
      else {
        this.createWindow()
      }
    }
    createWindow() {
      if (this.id()) { // existing note - note's icon
        fetch(`http://localhost:3000/notes/${this.id()}`)
        .then(r => r.json())
        .then(note => {
          new Window(note)
        })
      }
      else { // new note - notepad icon
        new Window(this.note)
      }
    }

  // create

  // update
  refreshIcon() {
    this.li.innerHTML = `
      <img src='images/notepad-icon.png'><br>
      <span>${this.name()}</span>
    `
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
      this.icon.style.top = (this.icon.offsetTop - pos2) + 'px'
      this.icon.style.left = (this.icon.offsetLeft - pos1) + 'px'
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.removeEventListener('mouseup', boundCloseDragElement)
      document.removeEventListener('mousemove', boundElementDrag)
    }
  }

  // UPDATE NOTE TITLE WHEN window SAVED!!!!

  // delete
  confirmDeleteIcon() {
    if (confirm('Delete file?')) {
      this.deleteIcon()
    }
  }
  deleteIcon() {
    this.li.remove()
  }
}
