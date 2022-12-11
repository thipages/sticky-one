import style from 'ustyler'
import uid from './uid.js'

// Reference:  https://stackoverflow.com/a/37802204/218223
const setDOMCssVariable = (uid, value) => document.documentElement.style.setProperty('--' + uid, value)
function setCssVariable(props, value) {
    if (props) {
        // update css variable value in cssVariablesNameTo_ui_value
        props.value=value
        // set new css variable in DOM
        setDOMCssVariable(props.uid, props.value)
    }
}
export default function (styleObject, transStyle) {
    let classNameToUid={}
    let cssPropertyToUid = {}
    if (styleObject) {
        // Iterate through all class names
        for (const [key, styleString] of Object.entries(styleObject)) {
            // Lookups class name to uid to be used in stylesheets
            classNameToUid[key]=uid()
            let  cssProperties=extractCSSVariables(styleString)
            let updatedStyle=styleString;
            // Iterate through all css Propperties found
            for (const {name, defaultValue, uid} of cssProperties) {
                const transValue = transStyle[name] ? transStyle[name](defaultValue) : defaultValue
                // Lookups css property to uid to be used in stylesheets
                cssPropertyToUid[name]={value:transValue, uid}
                const re = new RegExp('--'+name)
                updatedStyle = updatedStyle.replace(re, '--'+uid)
                setCssVariable(cssPropertyToUid[name], transValue)
            }
            style`
                .${classNameToUid[key]} {
                    ${updatedStyle}
                }
            `
        }
    }
    return {
        classNameToUid,
        setCssVariable(name, value) {
            const uid = cssPropertyToUid[name]
            if (uid) setCssVariable(uid, value)
        }
    }
}
const re = /--([a-z]+[a-z0-9-]*)\s*(,\s*.+)*\)/gi
const def = (val) => val?.replace (/\s|,/g, '') || ''
function extractCSSVariables (content) {
    return [...content.matchAll(re)].map(v=>
        ({
            name:v[1],
            defaultValue:def(v[2]),
            uid:uid()
        })
    )
}