import BaseLayer from './BaseLayer'
import {defaultTheme} from '../theme'
import Player from '../components/Player'

import store from '../store'
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

    this.state = newState
    this.state.dirty = false

    // Determine if we need to dirty the layer for rendering
    this.dirty = true
  }

  render () {
    if (!this.dirty) {
      return
    }

    let {columns, rows, width, height, player} = this.state,
        widthPerBlock = width / columns,
        heightPerBlock = height / rows
    
    this.element.width = width
    this.element.height = height

    let {row, column} = player.position,
        centerX = column * widthPerBlock + widthPerBlock / 2,
        centerY = row * heightPerBlock + heightPerBlock / 2,
        radius = Math.min(widthPerBlock, heightPerBlock) * 0.8 / 2

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