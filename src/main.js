// console.log('Hello World!')
// 
import {createStore} from './stateManager'
import reducer from './reducer'

let store = createStore(reducer)
console.log(store)