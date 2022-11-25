let seed = 's'+(''+Math.random()).replace('.', '')
let inc = 1
export default () => seed + `${++inc}`