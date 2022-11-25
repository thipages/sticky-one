import {html} from '../node_modules/uhtml/esm.js'

export function commands (startPage, render) {
    const list1 = startPage.state('page1.list')
    list1.update({
        items:[
            {id:1, label:html`<a href="#" >tit</a>`},
            {id:2, label:'tit2'}
        ]
    })
    render()
    list1.bind(
        function (data) {
            list1.style('li', 'green')
            startPage.update({
                content : ['page22', 'page1']}
            )
            render()
        }
    )
}