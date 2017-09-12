import BaseLayer from './BaseLayer'
import {defaultTheme} from '../theme'
import Block from '../components/Block'

import store from '../store'
import {action} from '../action'
import {stateKey, layerType} from '../enums'

export default class GameMapLayer extends BaseLayer {
  constructor (container) {
    super(container)
    this.type = layerType.GAME_MAP
    this.stateKey = stateKey.GAME_MAP
  }

  update (changeSet = {}) {
    let newState = store.getState(this.stateKey)

    // Do nothing if the state is dirty
    if (!newState.dirty) {
      return
    }
    
    // TODO: update this for more complicated state changes
    this.state = newState
    // Determine if we need to dirty the layer for rendering
    this.dirty = true
    store.dispatch(action.updateDirty(false, this.stateKey))
  }

  render () {
    if (!this.dirty) {
      return
    }

    let {columns, rows, blocks} = this.state,
        width = this.container.offsetWidth,
        height = this.container.offsetHeight,
        widthPerBlock = width / columns,
        heightPerBlock = height / rows
    
    this.element.width = width
    this.element.height = height
    this.context.fillStyle = defaultTheme.BACKGROUND_COLOR
    this.context.fillRect(0, 0, width, height)

    this.context.fillStyle = defaultTheme.EDGE_COLOR
    this.context.beginPath()
    for (let i = 0; i <= columns; i++) {
      let x = i * widthPerBlock
      this.context.moveTo(x, 0)
      this.context.lineTo(x, height)
      this.context.stroke()
    }

    for (let j = 0; j <= rows; j++) {
      let y = j * heightPerBlock
      this.context.moveTo(0, y)
      this.context.lineTo(width, y)
      this.context.stroke()
    }

    blocks.forEach((block) => {
      let {row, column} = block.position
      this.context.fillStyle = defaultTheme.OBSTACLE_BLOCK_COLOR
      this.context.fillRect(column * widthPerBlock + 1, row * heightPerBlock + 1, widthPerBlock - 2, heightPerBlock - 2)
    })

    this.dirty = false
  }
}