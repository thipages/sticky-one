import { register } from "./notifier.js"
import {render} from 'uhtml'

export function startApp (rootView, rootNode=document.body) {
    if (!(rootView)) {
        throw "Controller needs rootView and render parameters"
    }
    const root = rootView
    const renderAll = () => render(rootNode, root.render)
    register(renderAll)
    renderAll()
}