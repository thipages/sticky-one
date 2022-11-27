let seed = 'sticky_'+(''+Math.random()).replace('.', '');
let inc = 1;
var uid = () => seed + `${++inc}`;

let stickyCallback, updates = false;
const STICKY = uid();
const stickyEvent = () => new CustomEvent(STICKY, {});
const register = (callback) => {
    if (stickyCallback) return
    stickyCallback = callback;
    document.addEventListener(STICKY, ()=>updates = true);
    refresh();
};
const notify = () => document.dispatchEvent (stickyEvent());

function refresh () {
    if (updates) {
        stickyCallback();
        updates = false;
    }
    requestAnimationFrame(refresh);
}

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

function sticky (data)  {
    return sticky2(typeof data === 'function' ? data() : data)
}
const RESTRICTED = ['info', 'render', 'update', 'model', 'bind', 'style', 'children'];
function sticky2 ({view, model={}, handleEvent=nop, style, children={}, init})  {
    if (!view || typeof view !== 'function') {
        console.error('inputs leading to error:', {view, model, handleEvent, style, children});
        throw "view property is missing!"
    }
    uid();
    model.broadcast = function (data) {
        let changes = false;
        for (const command of commands) {
            if (command(data)) changes = true;
        }
        if (changes) notify ();
    };
    model.handleEvent = handleEvent;
    let S = styler(style);
    model.style = style ? S.classNameToUid : {};
    // Commands
    let commands = [];
    const obj= {
        info() {
            // todo: gives all information about model inputs and outputs
        },
        render () {
            return view(model, model.style, obj)
        },
        update (newModel) {
            Object.assign (model, newModel);
            notify();
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
                commands.push(command);
            }
        }
    };
    // Children attachments
    obj.children = Object.keys(children);
    for (const key of obj.children) {
        if (RESTRICTED.indexOf (key) !== -1) {
            throw "Component name use a restricted sticky word"
        }
        obj[key] = sticky(children[key]);
    }
    // Model initialization
    if (init) {
        for (const [componentName, initObj] of Object.entries(init)){
            if (!obj[componentName]) throw "Initialization use a wrong component name"
            obj[componentName].update(initObj);
        }
    }
    return obj;
}
function nop () {}
function copy(model) {
    return Object.assign({},model)
}

function controller (rootView, renderFunction, rootNode=document.body) {
    const root = sticky(rootView);
    const renderAll = () => renderFunction(rootNode, root.render);
    register(renderAll);
    return {root, renderAll}
}

export { controller, sticky };
