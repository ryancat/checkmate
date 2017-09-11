import Stone from './Stone'
import {stoneType} from '../enums'

export default class Enemy extends Stone {
  constructor (props) {
    super(props)
    
    this.type = stoneType.ENEMY
    this.isCopycat = props.isCopycat
  }
}

