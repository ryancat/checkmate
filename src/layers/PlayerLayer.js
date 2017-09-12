import BaseLayer from './BaseLayer'
import {defaultTheme} from '../theme'
import Player from '../components/Player'

import store from '../store'
import {action} from '../action'
import {stateKey, layerType} from '../enums'

import drawArc from '../shapes/arc'

export default class PlayerLayer extends BaseLayer {
  constructor (container) {
    super(container)
    this.type = layerType.PLAYER
    this.stateKey = stateKey.PLAYER
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

    let {columns, rows, player} = this.state,
        width = this.container.offsetWidth,
        height = this.container.offsetHeight,
        widthPerBlock = width / columns,
        heightPerBlock = height / rows,
        {row, column} = player.position,
        centerX = column * widthPerBlock + widthPerBlock / 2,
        centerY = row * heightPerBlock + heightPerBlock / 2,
        radius = Math.min(widthPerBlock, heightPerBlock) * 0.8 / 2

    this.element.width = width
    this.element.height = height
    
    drawArc(this.context, {
      fillStyle: defaultTheme.DEFAULT_PLAYER_COLOR,
      x: centerX,
      y: centerY,
      radius,
      startAngle: 0,
      endAngle: Math.PI * 2
    })
    
    this.dirty = false
  }
}