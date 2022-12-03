import list from './list.js'

list.bind(function(data) {
    const inc = data === 'plus' ? 1 : -1
    list.model.count+=inc
    list.style('margin', '10px')
    return true
})