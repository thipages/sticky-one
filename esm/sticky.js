import { broadcast } from 'broadcast';
import isObject from 'isobject'
import styler from './styler.js';
import uid from './uid.js'

export const STICKY_CHANNEL = uid()
export function sticky (data)  {
    return sticky2(typeof data === 'function' ? data() : data)
}
function sticky2 ({view, model={}, handleEvent=nop, style, children={}, init})  {
    if (!view || typeof view !== 'function') {
        console.error('inputs leading to error:', {view, model, handleEvent, style, children})
        throw "view property is missing!"
    }
    const id = uid();
    model.broadcast = function (data) {
        for (const command of commands) {
            if (command(data)) broadcast.that(STICKY_CHANNEL, 'binding')
        }
    }
    model.handleEvent = handleEvent
    let S = styler(style)
    model.style = style ? S.classNameToUid : {}
    // Commands
    let commands = []
    //
    for (const key of Object.keys(children)) {
        model[key] = sticky(children[key])
    }
    const obj= {
        info() {
            // todo: gives all information about model inputs and outputs
        },
        render () {
            return view(model, model.style)
        },
        update (newModel) {
            Object.assign (model, newModel)
            broadcast.that(STICKY_CHANNEL, 'updating')
        },
        model (path) {
            if (!path) {
                return copy(model)
            } else {
                // from 'obj1.obj21' to object or undefined
                let temp = this
                let names=path.split('.');
                for (name of names) {
                    temp=temp.model()[name]
                    if (!temp) break;
                }
                return temp;
            }
        },
        style (name, value) {
            // todo : need for a broadcast?
            return S.setCssVariable (name, value)
        },
        bind (newCommand)  {
            if (typeof newCommand === 'function') {
                commands.push(newCommand)
            }
        }
    }
    if (init) {
        for (const [componentName, initObj] of Object.entries(init)){
            model[componentName].update(initObj)
        }
    }
    return obj;
}
function nop () {}
function copy(model) {
    const modelCopy = Object.assign({},model)
    delete modelCopy.handleEvent
    delete modelCopy.broadcast
    delete modelCopy.style
    return modelCopy
}