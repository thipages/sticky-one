import { commands } from './commands.js'
import { controller } from './../index.js';
import main from './pages/main.js'
import {render} from '../node_modules/uhtml/esm.js'

const {component:startPage, render:r} = controller (main, render)
// commands(startPage)