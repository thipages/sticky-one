import { html } from "../../../index.js";

export default ()=> ({
    view: (m, s) => html`
    <ul class=${s.ul}>
        ${m.items.map((item)=> html`<li class=${s.li} style=${'color:'+item.color} onclick=${m} data-id=${item.id}>${item.label}</li>`)}
    </ul>
    `,
    handleEvent (e) {
        this.broadcast(e.target.dataset.id)
    },
    style: {
        ul:`
            list-style: var(--line-style);
            cursor:pointer;
        `,
        li: `
            color: var(--color);
        `
    }
})