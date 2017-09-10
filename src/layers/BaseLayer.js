import {defaultTheme} from '../theme'

export default class BaseLayer {
  constructor (props = {}, container) {
    if (!container) {
      throw Error ('No game map container defined')
    }

    this.container = container
    this.props = props
    this.init()
  }

  /**
   * Game init logic
   * - Create game layers
   */
  init () {
    this.element = document.createElement('canvas')

    // Set config to layer
    this.element.width = this.props.width
    this.element.height = this.props.height
    this.context = this.element.getContext('2d')

    this.context.fillStyle = this.props.backgroundColor || defaultTheme.DEFAULT_BACKGROUND_COLOR
    this.context.fillRect(0, 0, this.element.width, this.element.height)

    this.container.appendChild(this.element)
  }
}