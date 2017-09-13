import BaseLayer from './BaseLayer'
import {defaultTheme, defaultConfig} from '../theme'
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

  update () {
    let newState = store.getState(this.stateKey)
    // Do nothing if the state is dirty
    if (!newState.dirty) {
      return
    }

    let {columns, rows, player} = newState,
        width = this.container.offsetWidth,
        height = this.container.offsetHeight,
        widthPerBlock = width / columns,
        heightPerBlock = height / rows,
        {row, column} = player.position

    this.finalRenderState = {
      x: column * widthPerBlock + widthPerBlock / 2,
      y: row * heightPerBlock + heightPerBlock / 2,
      radius: Math.min(widthPerBlock, heightPerBlock) * 0.8 / 2,
      stone: player
    }

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
      this.renderState = Object.assign({}, this.finalRenderState)
    }
    else {
      let deltaDistance = defaultConfig.playerSpeed * dt,
          totalDistanceX = this.finalRenderState.x - this.renderState.x,
          totalDistanceY = this.finalRenderState.y - this.renderState.y

      // Check if we reached final render state
      this.dirty = totalDistanceX !== 0 || totalDistanceY !== 0

      if (!this.dirty) {
        return 
      }

      if (totalDistanceX > 0) {
        this.renderState.x += Math.min(deltaDistance, Math.abs(totalDistanceX))
      }
      else {
        this.renderState.x -= Math.min(deltaDistance, Math.abs(totalDistanceX))
      }

      if (totalDistanceY > 0) {
        this.renderState.y += Math.min(deltaDistance, Math.abs(totalDistanceY))
      }
      else {
        this.renderState.y -= Math.min(deltaDistance, Math.abs(totalDistanceY))
      }
    }

    this.element.width = this.container.offsetWidth
    this.element.height = this.container.offsetHeight
    
    if (this.renderState.stone.alive) {
      drawArc(this.context, {
        fillStyle: defaultTheme.PLAYER_COLOR,
        x: this.renderState.x,
        y: this.renderState.y,
        radius: this.renderState.radius,
        startAngle: 0,
        endAngle: Math.PI * 2
      })
    }
  }
}