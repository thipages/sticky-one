import { notify } from './notifier.js';
import styler from './styler.js';

export function sticky (data)  {
    return sticky2(typeof data === 'function' ? data() : data)
}
const RESTRICTED = ['render', 'model', 'bind', 'style']
function sticky2 ({view, model={}, handleEvent=noop, style=noop, transStyle=noop})  {
    if (!view) {
        throw "View property is missing!"
    }
    // Css variables manamenet
    const styleManager = styler(style, transStyle)
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
        render (updates={}) {
            obj.update(updates)
            return view(model, model.style)
        },
        style (nameOrObj, value) {
            if (nameOrObj) {
                if (typeof nameOrObj === 'string') {
                    nameOrObj = {[nameOrObj]: value}
                }
                for (const [name, value] of Object.entries(nameOrObj)) {
                    const transValue = transStyle[name] ? transStyle[name](value) : value
                    styleManager.setCssVariable (name, transValue)
                }
            }
            return obj
        },
        transStyle,
        bind (command)  {
            if (typeof command === 'function') {
                commands.push(command)
            }
            return obj
        },
        update (updates) {
            Object.assign(model, updates)
            return obj
        }
    }
    return obj;
}
function noop () {}