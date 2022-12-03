import list from './counter.js'

list.bind(function(data) {
    const inc = data === 'plus' ? 1 : -1
    list.model.count+=inc
    list.style('margin', '20px')
    return true
})