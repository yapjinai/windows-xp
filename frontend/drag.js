import {Draggable} from '/draggable'

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body')
  const noteWindow = document.querySelector('note-window')

  const draggable = new Draggable(document.querySelector('body'), {
    draggable: 'li'
  })

  draggable.on('drag:start', () => console.log('drag:start'));
  draggable.on('drag:move', () => console.log('drag:move'));
  draggable.on('drag:stop', () => console.log('drag:stop'));


}) // end DOMContentLoaded
