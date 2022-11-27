import { commands } from './commands.js'
import { controller } from './../index.js';
import main from './views/main.js'
import {render} from '../node_modules/uhtml/esm.js'

const {root, renderAll} = controller (main, render)
commands(root)
renderAll()