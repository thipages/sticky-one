import { R, html, sticky } from "../../index.js";
import {list1, list2} from './lists.js'

export default sticky ({
    view: (m, s) => html`
    <div class=${s.container}>
        ${R(list1, list2)}
    </div>
    `,
    style: {
        container:`
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr 3fr;
        `
    }
})