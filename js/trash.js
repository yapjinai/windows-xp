class Trash {

  constructor() {
    this.full = false

    // this.displayOnDOM()
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////

  displayOnDOM() {
    this.div = document.createElement('div')
    this.div.className = 'tab'
    this.div.dataset.id = this.id
    this.div.innerHTML = `
      <div class='tab-image left'></div>
      <span class='tab-title-bar'>${this.window.note.name} - Notepad</span>
      <div class='tab-image right'></div>
    `

    tabContainer.appendChild(this.div)

    this.tabTitleBar = this.div.querySelector('.tab-title-bar')

    this.makeClickable()
  }

  makeClickable() {
    this.div.addEventListener('click', () => {
      this.window.bringToFront()
    })
  }

  deleteOnDOM() {
    this.div.remove()
  }

  markSaved() {
    this.tabTitleBar.innerHTML = `
      ${this.window.note.name} - Notepad
    `
  }
  markNotSaved() {
    this.tabTitleBar.innerHTML = `
      ${this.window.note.name}* - Notepad
    `
  }
}
