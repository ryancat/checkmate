import Stone from './Stone'
import {stoneType} from '../enums'
import {defaultTheme} from '../theme'

export default class Player extends Stone {
  constructor (props) {
    super(props)
    
    this.type = stoneType.PLAYER
    this.fillStyle = defaultTheme.PLAYER_COLOR
  }
}

