function makeDraggable(elmnt, dragger) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0

  dragger.addEventListener('mousedown', dragMouseDown)

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
