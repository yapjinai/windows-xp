const iconContainer = document.querySelector('.icon-container')

let allIcons = []

class Icon {

  constructor(note) {
    allIcons.push(this)

    this.note = note
    this.id = note.id
    this.name = note.name

    // this.window = allWindows.find((window) => window.id === parseInt(noteId))
    // when should the icon's window attribute be connected to the window? // when window is created.... later

    this.displayIcon()

    this.li = iconContainer.querySelector(`[data-id='${this.id}']`)

    this.makeDoubleClickable()
    // this.makeDraggable()
    // this.makeDeleteable()
  }

  // read
  displayIcon() {
    console.log(this.name);
    const iconLi = document.createElement('li')
    iconLi.setAttribute('class', 'note-icon')
    iconLi.dataset.id = this.id
    iconLi.innerHTML = `
      <img src='images/notepad-icon.png'><br>
      <span>${this.name}</span>
    `
    iconContainer.appendChild(iconLi)
  }

  makeDoubleClickable() {
    this.li.addEventListener('dblclick', (event) => {
      this.doubleClick()



    })
  }
    doubleClick() {
      const noteId = this.id

      const windowAlreadyExists = allWindows.find((window) => {
        return window.id === parseInt(noteId)
      })

      if (windowAlreadyExists) {
        console.log('already exists');
        // make active
      }
      else {
        this.createWindow()
      }
    }
    createWindow() {
      if (this.id) { // existing note
        fetch(`http://localhost:3000/notes/${this.id}`)
        .then(r => r.json())
        .then(note => {
          new Window(note)
        })
      }
      else { // new note
        new Window(this.note)
      }
    }

  // create

  // update
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

  // delete
  makeDeleteable() {
    this.deleteButton.addEventListener('click', (event) => {
      event.preventDefault()
      this.closeIcon() // delete icon object
      this.deleteNote() // delete note from backend
      this.removeNote() // remove icon on page
    })
  }

    deleteNote() {
      fetch(`http://localhost:3000/notes/${this.id}`, {
        method: 'DELETE'
      })
    }
    removeNote() {
      let allNotes = document.getElementsByClassName('note-icon')
      const removedNote = [...allNotes].find(note => parseInt(note.dataset.id) === this.id )
      removedNote.remove()
    }
}

// TO DO:

// transfer function 'makeDoubleClickable' to here from main.js
