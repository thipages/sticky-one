import {list1, list2} from './lists.js'

list1
.style ('line-style', 'square')
.style({
    'color': 'blue'
})
.style()
.model.items = [
    {label: 'dog', id:1},
    {label: 'cat', id:2},
    {label: 'frog', id:3},
]

list2.model.items = [
    {label: 'brown', id:1, color:'white'},
    {label: 'white', id:2, color:'white'},
    {label: 'green', id:3, color:'white'},
]

list1.bind(function(id) {
    for (const m of list2.model.items) {
        m.color = m.id == id ? 'blue' : 'white'
    }
    return true
})