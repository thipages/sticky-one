import { register } from "./notifier.js"
import { sticky } from "./sticky.js"

export function controller (rootView, renderFunction, rootNode=document.body) {
    const root = sticky(rootView)
    const renderAll = () => renderFunction(rootNode, root.render)
    register(renderAll)
    return {root, renderAll}
}