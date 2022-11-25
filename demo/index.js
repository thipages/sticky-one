import {html, render} from '../node_modules/uhtml/esm.js'

import { commands } from './commands.js'
import main from './pages/main.js'
import { sticky } from './../index.js';

const startPage = sticky(main());
startPage.update({
    content : [
       'page1',
       'page21'
    ]}
)
console.log(startPage.state())
commands(startPage, ()=> render (document.body, startPage.render))