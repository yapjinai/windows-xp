document.addEventListener('DOMContentLoaded', () => {

//////////////////////////////// time

  const time = document.querySelector('.time')

  function startTime() {
    const today = new Date()
    const mo = today.getMonth()
    const d = today.getDate()
    const y = today.getFullYear()
    const h = today.getHours()
    const m = pad(today.getMinutes())
    const s = pad(today.getSeconds())
    time.innerText = `${mo}/${d}/${y}, ${h}:${m}:${s}`
    // h + ":" + m + ":" + s
    var t = setTimeout(startTime, 500)
  }

  function pad(i) {
    if (i < 10) {i = "0" + i}
    return i
  }

  startTime()

////////////////////////////////// start menu

  const startButton = document.querySelector('.start-button')
  const startMenu = document.querySelector('.start-menu')
  let startMenuOn = false

  startButton.addEventListener('click', () => {
    startMenuOn = !startMenuOn
    if (startMenuOn) {
      startButton.classList.add('on')
      startMenu.style.display = 'initial'
    }
    else {
      startButton.classList.remove('on')
      startMenu.style.display = 'none'
    }
  })

  document.addEventListener('click', (event) => {
    if (startMenuOn && (event.target !== startMenu && event.target != startButton)) {
      startMenuOn = false
      startButton.classList.remove('on')
      startMenu.style.display = 'none'
    }
  })

//////////////////////////////////// draggable

  const noteWindow = document.querySelector('.note-window')
  const dragBar = document.querySelector('.drag-bar')


  function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0

    // dragBar.onmousedown = dragMouseDown
    dragBar.addEventListener('mousedown', dragMouseDown)

    function dragMouseDown(e) {
      e.preventDefault()
      // get the mouse cursor position at startup:
      pos3 = e.clientX
      pos4 = e.clientY
      document.addEventListener('mouseup', closeDragElement)
      // call a function whenever the cursor moves:
      document.addEventListener('mousemove', elementDrag)
    }

    function elementDrag(e) {
      e.preventDefault()
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX
      pos2 = pos4 - e.clientY
      pos3 = e.clientX
      pos4 = e.clientY
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px"
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.removeEventListener('mouseup', closeDragElement)
      document.removeEventListener('mousemove', elementDrag)
    }
  }
  dragElement(noteWindow)

}) //END END
