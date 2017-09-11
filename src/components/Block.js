import {blockType} from '../enums'
import Position from './Position'

export default class Block {
  constructor (props) {
    // TODO: check props has all required properties
    this._props = props
    this.position = new Position(props.row, props.column)
    this.type = 'block'
  }
}

