let seed = 'sticky_'+(''+Math.random()).replace('.', '')
let inc = 1
export default () => seed + `${++inc}`