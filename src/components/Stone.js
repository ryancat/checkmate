import Position from './Position'
import {stoneType} from '../enums'
import {defaultTheme} from '../theme'

export default class Stone {
  constructor (props) {
    // TODO: check props has all required properties
    this.position = new Position(props.row, props.column)
    this.alive = props.alive || true
    this.moveHistory = props.moveHistory || []
    this.addToMoveHistory(this.position)
  }

  toggleType () {
    if (this.type === stoneType.PLAYER) {
      this.type = stoneType.ENEMY
      this.fillStyle = defaultTheme.ENEMY_COLOR
    }
    else {
      this.type = stoneType.PLAYER
      this.fillStyle = defaultTheme.PLAYER_COLOR
    }
  }

  addToMoveHistory (position) {
    this.moveHistory.push(new Position(position.row, position.column))
  }

  moveRight () {
    this.position.moveRight()
    this.addToMoveHistory(this.position)
  }

  moveLeft () {
    this.position.moveLeft()
    this.addToMoveHistory(this.position)
  }

  moveUp () {
    this.position.moveUp()
    this.addToMoveHistory(this.position)
  }

  moveDown () {
    this.position.moveDown()
    this.addToMoveHistory(this.position)
  }

  moveTo (position) {
    this.position.moveTo(position)
    this.addToMoveHistory(this.position)
  }

  moveBack () {
    // Discard the current position
    this.moveHistory.pop()
    if (this.moveHistory.length > 0) {
      this.moveTo(this.moveHistory[this.moveHistory.length - 1])
    }
  }

  die () {
    this.alive = false
  }
}

