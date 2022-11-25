import style from 'ustyler'
import uid from './uid.js'

// reference:  https://stackoverflow.com/a/37802204/218223
const setDOMCssVariable = (uid, value) => document.documentElement.style.setProperty('--' + uid, value)
function setCssVariable(props, value) {
    if (props) {
        // update css variable value in cssVariablesNameTo_ui_value
        props.value=value
        // set new css variable in DOM
        setDOMCssVariable(props.uid, props.value)
    }
}
export default function (styleObject) {
    let classNameToUid={}
    let cssVariablesNameToUiValue = {}
    if (styleObject) {
        // Create static styles
        for (const [key, styleString] of Object.entries(styleObject)) {
            classNameToUid[key]=uid()
            let  cssVar=extractCSSVariables(styleString)
            let updatedStyle=styleString;
            for (const {name, value, uid} of cssVar) {
                cssVariablesNameToUiValue[name]={value, uid}
                // FIXME : substring of key will match also
                const re = new RegExp('--'+key)
                updatedStyle = updatedStyle.replace(re, '--'+uid)
                setCssVariable(cssVariablesNameToUiValue[name], value)
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
            return setCssVariable(cssVariablesNameToUiValue[name], value)
        }
    }
}
const re = /--([a-z]+[a-z0-9-]*)\s*(,\s*.+)*\)/gi
const def = (val) => val?.replace (/\s|,/g, '') || ''
function extractCSSVariables (content) {
    return [...content.matchAll(re)].map(v=>
        ({
            name:v[1],
            value:def(v[2]),
            uid:uid()
        })
    )
}