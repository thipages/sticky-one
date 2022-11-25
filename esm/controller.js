import { STICKY_CHANNEL, sticky } from "./sticky.js";

import {broadcast} from 'broadcast'

export function controller (rootView, renderFunction, rootNode=document.body) {
    const component = sticky(rootView);
    const render = () => renderFunction(rootNode, component.render);
    broadcast.all(STICKY_CHANNEL, ()=>{
        render()
    })
    setInterval (render, 500)
    return {
        component,
        render
    }
}