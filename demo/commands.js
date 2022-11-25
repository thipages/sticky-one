import {html} from '../node_modules/uhtml/esm.js'

export function commands (startPage) {
    const list1 = startPage.model('page1.list')
    list1.update({
        items:[
            {id:1, label:html`<a href="#" >tit</a>`},
            {id:2, label:'tit2'}
        ]
    })
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