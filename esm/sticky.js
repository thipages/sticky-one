import { notify } from './notifier.js';
import styler from './styler.js';
import uid from './uid.js'

export function sticky (data)  {
    return sticky2(typeof data === 'function' ? data() : data)
}
const RESTRICTED = ['render', 'model', 'bind', 'style']
function sticky2 ({view, model={}, handleEvent=noop, style=noop})  {
    if (!view) {
        throw "View property is missing!"
    }
    // Css variables manamenet
    const styleManager = styler(style)
    // Add to model broadcast, handleEvent and style restricted properties
    model.broadcast = function (data) {
        let changes = false;
        for (const command of commands) {
            if (command(data)) changes = true;
        }
        if (changes) notify()
    }
    model.handleEvent = handleEvent
    model.style = style ? styleManager.classNameToUid : {}
    // Commands storage
    const commands = []
    // Sticky object
    const obj= {
        model,
        render () {
            return view(model, model.style, model.broadcast)
        },
        style (nameOrObj, value) {
            if (nameOrObj) {
                if (typeof nameOrObj === 'string') {
                    nameOrObj = {[nameOrObj]: value}
                }
                for (const [name, value] of Object.entries(nameOrObj)) {
                    styleManager.setCssVariable (name, value)
                }
            }
            return obj
        },
        bind (command)  {
            if (typeof command === 'function') {
                commands.push(command)
            }
            return obj
        }
    }
    return obj;
}
function noop () {}