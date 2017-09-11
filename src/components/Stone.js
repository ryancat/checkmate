import Position from './Position'
import {stoneType} from '../enums'

export default class Stone {
  constructor (props) {
    // TODO: check props has all required properties
    this._props = props
    this.position = new Position(props.row, props.column)
  }
}

