/**
 * Create, append, and return, a style node with the passed CSS content.
 * @param {string|string[]} template the CSS text or a template literal array.
 * @param {...any} values the template literal interpolations.
 * @return {HTMLStyleElement} the node appended as head last child.
 */
function ustyler(template) {
  const text = typeof template == 'string' ? [template] : [template[0]];
  for (let i = 1, {length} = arguments; i < length; i++)
    text.push(arguments[i], template[i]);
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(text.join('')));
  return document.head.appendChild(style);
}

let seed = 's'+(''+Math.random()).replace('.', '');
let inc = 1;
var uid = () => seed + `${++inc}`;

// reference:  https://stackoverflow.com/a/37802204/218223
const setDOMCssVariable = (uid, value) => document.documentElement.style.setProperty('--' + uid, value);
function setCssVariable(props, value) {
    if (props) {
        // update css variable value in cssVariablesNameTo_ui_value
        props.value=value;
        // set new css variable in DOM
        setDOMCssVariable(props.uid, props.value);
    }
}
function styler (styleObject) {
    let classNameToUid={};
    let cssVariablesNameToUiValue = {};
    if (styleObject) {
        // Create static styles
        for (const [key, styleString] of Object.entries(styleObject)) {
            classNameToUid[key]=uid();
            let  cssVar=extractCSSVariables(styleString);
            let updatedStyle=styleString;
            for (const {name, value, uid} of cssVar) {
                cssVariablesNameToUiValue[name]={value, uid};
                // FIXME : substring of key will match also
                const re = new RegExp('--'+key);
                updatedStyle = updatedStyle.replace(re, '--'+uid);
                setCssVariable(cssVariablesNameToUiValue[name], value);
            }
            ustyler`
                .${classNameToUid[key]} {
                    ${updatedStyle}
                }
            `;
        }
    }
    return {
        classNameToUid,
        setCssVariable(name, value) {
            return setCssVariable(cssVariablesNameToUiValue[name], value)
        }
    }
}
const re = /--([a-z]+[a-z0-9-]*)\s*(,\s*.+)*\)/gi;
const def = (val) => val?.replace (/\s|,/g, '') || '';
function extractCSSVariables (content) {
    return [...content.matchAll(re)].map(v=>
        ({
            name:v[1],
            value:def(v[2]),
            uid:uid()
        })
    )
}

function sticky ({view, model={}, handleEvent=nop, style, children={}})  {
    if (!view) {
        console.error({view, model, handleEvent, style, children});
        throw "view property is missing!"
    }
    uid();
    model.broadcast = function (data) {
        for (const command of commands) {
            command(data);
        }
    };
    model.handleEvent = handleEvent;
    let S = styler(style);
    model.style = style ? S.classNameToUid : {};
    // Commands
    let commands = [];
    //
    for (const key of Object.keys(children)) {
        model[key] = sticky(children[key]());
    }
    const obj= {
        info() {
            // todo: gives all information about model inputs and outputs
        },
        render () {
            return view(model, model.style)
        },
        update (newState) {
            Object.assign (model, newState);
        },
        state (path) {
            if (!path) {
                return copy(model)
            } else {
                // from 'obj1.obj21' to object or undefined
                let temp = this;
                let names=path.split('.');
                for (name of names) {
                    temp=temp.state()[name];
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
                commands.push(newCommand);
            }
        }
    };
    return obj;
}
function nop () {}
function copy(state) {
    const stateCopy = Object.assign({},state);
    delete stateCopy.handleEvent;
    delete stateCopy.broadcast;
    delete stateCopy.style;
    return stateCopy
}

export { sticky };
