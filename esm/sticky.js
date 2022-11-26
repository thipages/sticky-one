import { broadcast } from 'broadcast';
import styler from './styler.js';
import uid from './uid.js'

export const STICKY_CHANNEL = uid()
export function sticky (data)  {
    return sticky2(typeof data === 'function' ? data() : data)
}
const RESTRICTED = ['info', 'render', 'update', 'model', 'bind', 'style']
function sticky2 ({view, model={}, handleEvent=nop, style, children={}, init})  {
    if (!view || typeof view !== 'function') {
        console.error('inputs leading to error:', {view, model, handleEvent, style, children})
        throw "view property is missing!"
    }
    const id = uid();
    model.broadcast = function (data) {
        let changes = false;
        for (const command of commands) {
            if (command(data)) changes = true;
        }
        if (changes) broadcast.that(STICKY_CHANNEL, 'bound')
    }
    model.handleEvent = handleEvent
    let S = styler(style)
    model.style = style ? S.classNameToUid : {}
    // Commands
    let commands = []
    const obj= {
        info() {
            // todo: gives all information about model inputs and outputs
        },
        render () {
            return view(model, model.style, obj)
        },
        update (newModel) {
            Object.assign (model, newModel)
            broadcast.that(STICKY_CHANNEL, 'updated')
        },
        model () {
            return copy(model)
        },
        style (name, value) {
            // todo : need for a broadcast?
            return S.setCssVariable (name, value)
        },
        bind (command)  {
            if (typeof command === 'function') {
                commands.push(command)
            }
        }
    }
    // Children attachments
    for (const key of Object.keys(children)) {
        if (RESTRICTED.indexOf (key) !== -1) {
            throw "Component name use a restricted sticky word"
        }
        obj[key] = sticky(children[key])
    }
    // Model initialization
    if (init) {
        for (const [componentName, initObj] of Object.entries(init)){
            if (!obj[componentName]) throw "Initialization use a wrong component name"
            obj[componentName].update(initObj)
        }
    }
    return obj;
}
function nop () {}
function copy(model) {
    const modelCopy = Object.assign({},model)
    return modelCopy
}