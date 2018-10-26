document.addEventListener('DOMContentLoaded', () => {
  let controlPressed = false

  function listenForFirstKey() {
    document.addEventListener('keydown', (e) => {
      if (!controlPressed) {
        if (e.key === 'Control') {
          controlPressed = true
          document.addEventListener('keyup', (e) => {
            controlPressed = false
          })
        }
      }
      else { // if control is pressed
        switch (e.key) {
          case 's':
            save()
            break;
          case 'w':
            close()
            break;
          // case 'n':
          //   // new()
          //   break;
        }
      }
    })
  }
  listenForFirstKey()

  function save() {
    if (activeNote) {
      activeNote.confirmSave()
    }
  }

  function close() {
    if (activeNote) {
      // console.log(activeNote);
      // console.log(activeNote.window);
      activeNote.window.confirmClose()
    }
  }

  // function new() {
  //
  // }
})
