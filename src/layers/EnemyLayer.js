import BaseLayer from './BaseLayer'
import {defaultTheme} from '../theme'
import Enemy from '../components/Enemy'

import store from '../store'
import {stateKey, layerType} from '../enums'

import drawArc from '../shapes/arc'

export default class EnemyLayer extends BaseLayer {
  constructor (container) {
    super(container)
    this.type = layerType.ENEMY
    this.stateKey = stateKey.ENEMY
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

    let {columns, rows, width, height, enemies} = this.state,
        widthPerBlock = width / columns,
        heightPerBlock = height / rows
    
    this.element.width = width
    this.element.height = height

    enemies.forEach((enemy) => {
      let {row, column} = enemy.position,
          centerX = column * widthPerBlock + widthPerBlock / 2,
          centerY = row * heightPerBlock + heightPerBlock / 2,
          radius = Math.min(widthPerBlock, heightPerBlock) * 0.8 / 2

      drawArc(this.context, {
        fillStyle: enemy.isCopycat ? defaultTheme.DEFAULT_PLAYER_COLOR : defaultTheme.DEFAULT_ENEMY_COLOR,
        x: centerX,
        y: centerY,
        radius,
        startAngle: 0,
        endAngle: Math.PI * 2
      })
    })

    this.dirty = false
  }
}