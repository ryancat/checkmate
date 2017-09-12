import Position from './Position'
import {stoneType} from '../enums'

export default class Stone {
  constructor (props) {
    // TODO: check props has all required properties
    this.position = new Position(props.row, props.column)
    this.alive = true
  }

  // isHitOnRight () {
  //   let isHitOnEdge = this.position.column > this._props.columns,
  //       isHit
  // }

  moveRight () {
    this.position.moveRight()
  }

  moveLeft () {
    this.position.moveLeft()
  }

  moveUp () {
    this.position.moveUp()
  }

  moveDown () {
    this.position.moveDown()
  }
}

