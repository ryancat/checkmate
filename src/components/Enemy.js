import Stone from './Stone'
import {stoneType} from '../enums'
import {defaultTheme} from '../theme'

export default class Enemy extends Stone {
  constructor (props = {}) {
    super(props)
    
    this.type = stoneType.ENEMY
    this.fillStyle = defaultTheme.ENEMY_COLOR
    // this.setCopycat(props.isCopycat || false)
  }

  // toggleKind () {
  //   this.isCopycat = !this.isCopycat
  // }

  // setCopycat (isCopycat) {
  //   this.isCopycat = isCopycat
  //   this.fillStyle = isCopycat ? defaultTheme.PLAYER_COLOR : defaultTheme.ENEMY_COLOR
  // }
}

