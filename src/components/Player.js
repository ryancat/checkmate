import Stone from './Stone'
import {stoneType} from '../enums'

export default class Player extends Stone {
  constructor (props) {
    super(props)
    
    this.type = stoneType.PLAYER
  }
}

