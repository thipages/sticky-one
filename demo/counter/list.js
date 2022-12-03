import { html, sticky } from "../../index.js";

export default sticky(
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