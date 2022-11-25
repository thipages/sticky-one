import {html} from '../../node_modules/uhtml/esm.js'
import {page1} from './page1.js'
import {page21} from './page21.js'
import {page22} from './page22.js'

const view = (m, s) => {
    return html`
    <div class=${s.container}>
        ${m.content.map((pageName) => html`<div>${m[pageName].render()}</div>`)}
    </div>
`
}
const style = {
    container: `
        display:grid;
        grid-template-columns: 1fr 3fr
    `
}
export default function() {
    return  {
        view,
        children:{
            page1, page21, page22
        },
        style,
        model :
        {
            content : [
               'page1',
               'page21'
            ]
        }
    }
}