# Simple requestAnimationFrame helper

## Install

`npm install mud-from-to` or `yarn add mud-from-to`

## Usage example


```
import fromTo from 'mud-from-to'

fromTo({
    start: 0, 
    end: 100,
    duration: 1000, // default
    easing(t, b, c, d) {
      if((t /= d / 2) < 1) return c / 2 * t * t + b
      return -c / 2 * ((--t) * (t - 2) - 1) + b
    } // default
}, (v) => console.log(v)).then((v) => {
    console.log('done', v)
})

```
