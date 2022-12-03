import uid from "./uid.js"

let stickyCallback, updates = false
const STICKY = uid()
const stickyEvent = new CustomEvent(STICKY, {})
export const register = (callback) => {
    if (stickyCallback) return
    stickyCallback = callback
    document.addEventListener(STICKY, ()=>updates = true)
    refresh();
}
export const notify = () => document.dispatchEvent (stickyEvent)

function refresh () {
    if (updates) {
        stickyCallback()
        updates = false
    }
    requestAnimationFrame(refresh)
}