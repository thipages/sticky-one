import {html} from '../node_modules/uhtml/esm.js'

export function commands (startPage) {
    const list1 = startPage.page1.list
    list1.bind(
        function (data) {
            list1.style('li', 'green')
            startPage.update({
                content : ['page22', 'page1']}
            )
            return true;
        }
    )
}