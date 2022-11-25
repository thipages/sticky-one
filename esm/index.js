import styler from './styler.js';
import uid from './uid.js'

export function sticky ({view, model={}, handleEvent=nop, style, children={}})  {
    if (!view) {
        console.error({view, model, handleEvent, style, children})
        throw "view property is missing!"
    }
    const id = uid();
    model.broadcast = function (data) {
        for (const command of commands) {
            command(data)
        }
    }
    model.handleEvent = handleEvent
    let S = styler(style)
    model.style = style ? S.classNameToUid : {}
    // Commands
    let commands = []
    //
    for (const key of Object.keys(children)) {
        model[key] = sticky(children[key]())
    }
    const obj= {
        info() {
            // todo: gives all information about model inputs and outputs
        },
        render () {
            return view(model, model.style)
        },
        update (newState) {
            Object.assign (model, newState)
        },
        state (path) {
            if (!path) {
                return copy(model)
            } else {
                // from 'obj1.obj21' to object or undefined
                let temp = this
                let names=path.split('.');
                for (name of names) {
                    temp=temp.state()[name]
                    if (!temp) break;
                }
                return temp;
            }
        },
        style (name, value) {
            return S.setCssVariable (name, value)
        },
        bind (newCommand)  {
            if (typeof newCommand === 'function') {
                commands.push(newCommand)
            }
        }
    }
    return obj;
}
function nop () {}
function copy(state) {
    const stateCopy = Object.assign({},state)
    delete stateCopy.handleEvent
    delete stateCopy.broadcast
    delete stateCopy.style
    return stateCopy
}