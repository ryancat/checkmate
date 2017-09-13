import BaseLayer from './BaseLayer'
import {defaultTheme, defaultConfig} from '../theme'
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

  update () {
    let newState = store.getState(this.stateKey)
    // Do nothing if the state is dirty
    if (!newState.dirty) {
      return
    }

    let {columns, rows, enemies} = newState,
        width = this.container.offsetWidth,
        height = this.container.offsetHeight,
        widthPerBlock = width / columns,
        heightPerBlock = height / rows

    this.finalRenderState = enemies.map((enemy) => {
      let {row, column} = enemy.position,
          centerX = column * widthPerBlock + widthPerBlock / 2,
          centerY = row * heightPerBlock + heightPerBlock / 2,
          radius = Math.min(widthPerBlock, heightPerBlock) * 0.8 / 2 

      return {
        x: column * widthPerBlock + widthPerBlock / 2,
        y: row * heightPerBlock + heightPerBlock / 2,
        radius: Math.min(widthPerBlock, heightPerBlock) * 0.8 / 2,
        stone: enemy
      }
    })

    // We have computed final render state based on new state
    store.dispatch(action.updateDirty(false, this.stateKey))
    // Now that we have new final render state, we need to let
    // render function to take care of rendering it
    this.dirty = true
  }

  render (dt) {

    if (!this.dirty) {
      return
    }

    if (!this.renderState) {
      // Deep clone
      this.renderState = this.finalRenderState.map((fstate) => {
        return Object.assign({}, fstate)
      })
    }
    else {
      let cleanCount = 0
      this.renderState.forEach((rstate) => {
        let fstate = this.finalRenderState.filter((state) => { return state.stone === rstate.stone })[0],
            deltaDistance = defaultConfig.enemySpeed * dt,
            totalDistanceX = fstate.x - rstate.x,
            totalDistanceY = fstate.y - rstate.y

        // Check if we reached final render state
        if (totalDistanceX === 0 && totalDistanceY === 0) {
          cleanCount++
        }
        this.dirty = cleanCount < this.renderState.length

        if (!this.dirty) {
          return 
        }

        if (totalDistanceX > 0) {
          rstate.x += Math.min(deltaDistance, Math.abs(totalDistanceX))
        }
        else {
          rstate.x -= Math.min(deltaDistance, Math.abs(totalDistanceX))
        }

        if (totalDistanceY > 0) {
          rstate.y += Math.min(deltaDistance, Math.abs(totalDistanceY))
        }
        else {
          rstate.y -= Math.min(deltaDistance, Math.abs(totalDistanceY))
        }
      })
    }

    this.element.width = this.container.offsetWidth
    this.element.height = this.container.offsetHeight

    this.renderState.forEach((rstate) => {
      let enemy = rstate.stone
      if (enemy.alive) {
        drawArc(this.context, {
          fillStyle: enemy.isCopycat ? defaultTheme.PLAYER_COLOR : defaultTheme.ENEMY_COLOR,
          x: rstate.x,
          y: rstate.y,
          radius: rstate.radius,
          startAngle: 0,
          endAngle: Math.PI * 2
        })
      }
    })
  }
}