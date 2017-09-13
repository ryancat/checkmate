export default class Position {
  constructor (row, column) {
    this.row = row
    this.column = column
  }

  moveRight () {
    this.column += 1
  }

  moveLeft () {
    this.column -= 1
  }

  moveUp () {
    this.row -= 1
  }

  moveDown () {
    this.row += 1
  }

  moveTo (position) {
    this.row = position.row
    this.column = position.column
  }
}