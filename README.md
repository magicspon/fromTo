# Simple requestAnimationFrame helper

```
import 'fromTo' from 'mud-from-to'

fromTo({start: 0, end: 100}, (v) => console.log(v)).then((v) => {
    console.log('done', v)
})

```