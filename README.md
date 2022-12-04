# sticky-one

Easy Tiny & Sticky JavaScript DOM rendering library

## Dependencies
[uhtml](https://github.com/WebReflection/uhtml), [ustyler](https://github.com/WebReflection/ustyler)
## Usage

See demo folder for structured examples

```javascript
import { html, sticky, startApp } from "sticky-one"
const counter = sticky(
    {
        view: (m, s)=> html`
        <div class=${s.container}>
            <button data-ref="minus" onclick=${m}>-</button>
            <span >${m.count}</span>
            <button data-ref="plus" onclick=${m}>+</button>
        </div>
        `,
        model: {count: 0},
        handleEvent: function (e) {
            this.broadcast(e.target.dataset.ref)
        },
        style : {
            container:`
                margin : var(--margin, 10px);
            `
        }
    }
)
counter.bind(function(data) {
    const inc = data === 'plus' ? 1 : -1
    counter.model.count+=inc
    counter.style('margin', '20px')
    return true
})
startApp(counter)

```