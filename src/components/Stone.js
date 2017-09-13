import Position from './Position'
import {stoneType} from '../enums'

export default class Stone {
  constructor (props) {
    // TODO: check props has all required properties
    this.position = new Position(props.row, props.column)
    this.alive = true
    this.moveHistory = [this.position]
  }

  moveRight () {
    this.position.moveRight()
    this.moveHistory.push(this.position)
  }

  moveLeft () {
    this.position.moveLeft()
    this.moveHistory.push(this.position)
  }

  moveUp () {
    this.position.moveUp()
    this.moveHistory.push(this.position)
  }

  moveDown () {
    this.position.moveDown()
    this.moveHistory.push(this.position)
  }

  die () {
    this.alive = false
  }
}

