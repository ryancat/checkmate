import {blockType} from '../enums'
import Position from './Position'
import {defaultTheme} from '../theme'

export default class Block {
  constructor (props) {
    // TODO: check props has all required properties
    this.position = new Position(props.row, props.column)
    this.type = blockType.BLOCK
    this.fillStyle = defaultTheme.OBSTACLE_BLOCK_COLOR
  }

  setPosition (position) {
    this.position = new Position(position.row, position.column)
  }
}

