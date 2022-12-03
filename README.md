# sticky2

Easy Tiny Sticky JavaScript DOM rendering library

## usage

See demo folder for architectural examples

```javascript
import { html, sticky, startApp } from "sticky-one"
const list = sticky(
    {
        view: (m, s)=> html`
        <div class=${s.container}>
        <button data-ref="minus" onclick=${m}>-</button>
        <span >${m.count}</span>
        <button data-ref="plus" onclick=${m}>+</button>
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
list.bind(function(data) {
    const inc = data === 'plus' ? 1 : -1
    list.model.count+=inc
    list.style('margin', '20px')
    return true
})
startApp(list)

```