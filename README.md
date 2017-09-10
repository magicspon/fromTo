# Simple requestAnimationFrame helper

```
import 'fromTo' from 'mudFromTo'

fromTo({start: 0, end: 100}, (v) => console.log(v)).then((v) => {
    console.log('done', v)
})

```