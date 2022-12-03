export { startApp } from './controller.js'
export {sticky} from './sticky.js'
export {html, render, svg} from 'uhtml'
export const R = (...stickies) => stickies.map (
    (s) => s.render()
)
