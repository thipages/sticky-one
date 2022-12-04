import { register } from "./notifier.js"
import {render} from 'uhtml'

let instancied = false
export function startApp (viewDefinition, rootNode=document.body) {
    if (instancied) return
    if (!(viewDefinition)) {
        throw "Controller needs at least a view definition"
    }
    instancied = true
    const renderAll = () => render(rootNode, viewDefinition.render)
    register(renderAll)
    renderAll()
}