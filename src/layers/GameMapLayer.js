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

  update (dt) {
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

    let x = 0,
        y = 0,
        xs = [],
        ys = [],
        {columns, rows, blocks} = this.state,
        width = this.container.offsetWidth,
        height = this.container.offsetHeight,
        widthPerBlock = width / columns,
        heightPerBlock = height / rows
    
    this.element.width = width
    this.element.height = height
    this.context.fillStyle = defaultTheme.DEFAULT_BACKGROUND_COLOR
    this.context.fillRect(0, 0, width, height)

    for (x = 0; x < width; x += widthPerBlock) {
      for (y = 0; y < height; y += heightPerBlock) {
        this.context.strokeRect(x, y, widthPerBlock, heightPerBlock)
      }
    }

    this.dirty = false
  }
}