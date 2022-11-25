import {html} from '../../node_modules/uhtml/esm.js'
import {list} from '../components/list.js'

export function page1 () {
    return {
        children : {
            list
        },
        view: (m)=>{
            return html`${m.list.render()}`
        }
    }
}