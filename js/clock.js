document.addEventListener('DOMContentLoaded', () => {

//////////////////////////////// add clock to bottom right of screen

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

})
