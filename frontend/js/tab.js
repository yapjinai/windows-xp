// let allTabs = []
// let activeTab // set this to be tab of active window

const tabContainer = document.querySelector('.tab-container')

class Tab {

  constructor(window) {
    // allTabs.push(this)
    // activeTab = this

    this.window = window
    this.displayOnDOM() // sets this.div, this.tabTitleBar
    // this.indicateSavedStatus()
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
