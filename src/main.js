export default function fromTo(options = {}, onTick) {
  const defaults = {
    easing(t, b, c, d) {
      if((t /= d / 2) < 1) return c / 2 * t * t + b
      return -c / 2 * ((--t) * (t - 2) - 1) + b
    },
    duration: 1000
  }

  const { easing, duration, start, end } = {...defaults, ...options}
  const condition = (lastTick, next, end) => {
    return (start <= end) ? (next <= end && lastTick <= next) : (next >= end && lastTick >= next)
  }

  let next = 0
  let timeElapsed = null
  let timeStart = null
  let frame = null
  return new Promise((resolve) => { 
    const loop = (currentTime) => {
      let lastTick = next || start
      if(!timeStart) timeStart = currentTime
      timeElapsed = currentTime - timeStart

      next = Math.round(easing(timeElapsed, start, end - start, duration))
      if(condition(lastTick, next, end)) {
        frame = window.requestAnimationFrame(loop)
        onTick && onTick(next)
      } else {
        resolve(lastTick)
        window.cancelAnimationFrame(frame)
        timeElapsed = null
        timeStart = null
        frame = null
        lastTick = null
      }
    }
    frame = window.requestAnimationFrame(loop)
  })
}