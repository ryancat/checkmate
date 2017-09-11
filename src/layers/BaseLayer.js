export default class BaseLayer {
  constructor (container) {
    if (!container) {
      throw Error ('No game map container defined')
    }

    this.container = container
    this.dirty = false
    this.state = {}
    
    this._addCanvasElement()
  }

  _addCanvasElement () {
    this.element = document.createElement('canvas')
    this.context = this.element.getContext('2d')
    this.container.appendChild(this.element)
  }

  // to be overwritten
  update () {

  }

  // to be overwritten
  render () {

  }
}