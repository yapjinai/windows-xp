class Menu {

  constructor(button, menu) {
    this.button = button
    this.menu = menu
    this.menuOn = false
    this.makeClickable()
    this.makeAutoCloseable()
  }

  makeClickable() {
    this.button.addEventListener('click', () => {
      this.menuOn = !this.menuOn
      if (this.menuOn) {
        this.button.classList.add('on')
        this.menu.classList.add('on')
      }
      else {
        this.button.classList.remove('on')
        this.menu.classList.remove('on')
      }
    })
  }

  makeAutoCloseable() {
    document.addEventListener('click', (event) => {
      if (this.menuOn && (event.target !== this.menu && event.target != this.button)) {
        this.menuOn = false
        this.button.classList.remove('on')
        this.menu.style.display = 'none'
      }
    })
  }
}
