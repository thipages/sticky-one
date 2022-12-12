import { R, html, startApp, sticky } from "../index.js"

import screen1 from "./1-counter/index.js";
import screen2 from "./2-components/index.js";

const menuModel = [
    {
        id:1,
        label:'counter',
        sticky: screen1
    },
    {
        id:2,
        label:'component',
        sticky: screen2
    }
]
const menu = sticky (
    {
        view :(m, s)=>{
            // fixed + dynamic classes
            // todo : possible simplification?
            const liClass = (liId) => [s.li, liId===m.id ? s.bold : s.normal].join(' ')
             return html`
                <ul class=${s.ul}>
                    ${m.items.map (item=>html`
                        <li class=${liClass(item.id)} data-id=${item.id} onclick=${m}>
                            ${item.label}
                        </li>`)}
                </ul>
        `},
        handleEvent : function (e) {
            // todo : avoid parseInt?
            const id = parseInt(e.target.dataset.id,10)
            this.broadcast(id)
        },
        style : {
            ul: `
                display: flex;
                list-style:none;
                justify-content: center;
                cursor: pointer;
            `,
            li : `
                margin-left:0.2rem;
                padding: 0.2rem 0.2rem 0.2rem;
                border-radius: 0.4rem;
                background: peachpuff;
            `,
            bold :`
                font-weight:bold;
            `,
            normal :`
                font-weight:normal;
            `
        }
    }
)
const ruler = sticky(
    {
        model : {
            screens: menuModel,
            id:1,
        },
        view: (m) => {
            return html`
                <div>${menu.render({items:m.screens, id:m.id})}<div>
                <div>${R(m.screens.filter(v=>v.id === m.id)[0].sticky)}</div>
        `},

    }
)
menu.bind(
    function (screenId) {
        if (screenId === ruler.model.id) return
        ruler.update({id:screenId})
        return true
    }
)
startApp(ruler)