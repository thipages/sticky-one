/*! (c) Andrea Giammarchi - ISC */

const _ = new WeakMap;

class Broadcast {
  constructor() {
    _.set(this, {v: new Map, f: new Map});
  }
  all(type, callback) {
    const {v, f} = _.get(this);
    if (!f.has(type))
      f.set(type, new Set);
    f.get(type).add(callback);
    if (v.has(type))
      Promise.resolve(v.get(type)).then(callback);
  }
  drop(type) {
    const {v, f} = _.get(this);
    if (1 < arguments.length) {
      if (f.has(type))
        f.get(type).delete(arguments[1]);
    }
    else {
      v.delete(type);
      f.delete(type);
    }
  }
  that(type) {
    if (1 < arguments.length) {
      const value = arguments[1];
      const {v, f} = _.get(this);
      v.set(type, value);
      if (f.has(type)) {
        for (const callback of f.get(type))
          callback(value);
      }
      return;
    }
    return value => this.that(type, value);
  }
  when(type) {
    const {v} = _.get(this);
    return v.has(type) ?
      Promise.resolve(v.get(type)) :
      new Promise(resolve => {
        const resolved = value => {
          this.drop(type, resolved);
          resolve(value);
        };
        this.all(type, resolved);
      });
  }
}

const broadcast = new Broadcast;

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

let seed = 'sticky_'+(''+Math.random()).replace('.', '');
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

const STICKY_CHANNEL = uid();
function sticky$1 (data)  {
    return sticky2(typeof data === 'function' ? data() : data)
}
const RESTRICTED = ['info', 'render', 'update', 'model', 'bind', 'style'];
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
        if (changes) broadcast.that(STICKY_CHANNEL, 'bound');
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
            broadcast.that(STICKY_CHANNEL, 'updated');
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
    for (const key of Object.keys(children)) {
        if (RESTRICTED.indexOf (key) !== -1) {
            throw "Component name use a restricted sticky word"
        }
        obj[key] = sticky$1(children[key]);
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
    const modelCopy = Object.assign({},model);
    return modelCopy
}

function controller$1 (rootView, renderFunction, rootNode=document.body) {
    const component = sticky$1(rootView);
    const render = () => renderFunction(rootNode, component.render);
    broadcast.all(STICKY_CHANNEL, ()=>{
        render();
    });
    setInterval (render, 500);
    return {
        component,
        render
    }
}

const controller=controller$1;
const sticky = sticky$1;

export { controller, sticky };
