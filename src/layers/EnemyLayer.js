import BaseLayer from './BaseLayer'
import {defaultTheme} from '../theme'
import Enemy from '../components/Enemy'

import store from '../store'
import {action} from '../action'
import {stateKey, layerType} from '../enums'

import drawArc from '../shapes/arc'

export default class EnemyLayer extends BaseLayer {
  constructor (container) {
    super(container)
    this.type = layerType.ENEMY
    this.stateKey = stateKey.ENEMY
    this.enemies = []
  }

  update (dt) {
    let newState = store.getState(this.stateKey)

    // Do nothing if the state is dirty
    if (!newState.dirty) {
      return
    }
    
    // TODO: update this for more complicated state changes
    this.state = newState
    this.enemies = 
    // Determine if we need to dirty the layer for rendering
    this.dirty = true
    store.dispatch(action.updateDirty(false, this.stateKey))
  }

  render () {

    if (!this.dirty) {
      return
    }

    let {columns, rows, enemies} = this.state,
        width = this.container.offsetWidth,
        height = this.container.offsetHeight,
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