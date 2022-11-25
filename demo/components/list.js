import {html} from '../../node_modules/uhtml/esm.js'

export function list () {
    const style = {
        ul :`cursor: pointer;`,
        li :`color: var(--li, blue)`
    }
    const model = {
        items:[]
    }
    const view = (m, s) => html`
    <ul class=${s.ul}>
    ${m.items.map(item=>html`<li class=${s.li} onclick=${m} data-id=${item.id}>${item.label}</li>`)}
    </ul>
    `
    function handleEvent(e) {
        this.broadcast(parseInt(e.target.dataset.id, 10))
    }
    return {model, view, handleEvent, style}
}