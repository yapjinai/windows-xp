document.addEventListener('DOMContentLoaded', () => {

////////////////////////////////// create start menu

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

})
