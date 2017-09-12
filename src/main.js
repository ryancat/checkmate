import store from './store'
import {action} from './action'
import gameLoop from './gameLoop'

import GameMapLayer from './layers/GameMapLayer'
import StatLayer from './layers/StatLayer'
import PlayerLayer from './layers/PlayerLayer'
import EnemyLayer from './layers/EnemyLayer'
import {layerType} from './enums'

import './main.scss'

const rootContainer = document.getElementById('root')
let layers = []
let keyMap = {}

let game = gameLoop({
  fps: 60,

  /**
   * Logic for init the game
   * - Create canvas layers
   * - Init game state
   */
  init: () => {
    layers[layerType.GAME_MAP] = new GameMapLayer(rootContainer)
    layers[layerType.STAT] = new StatLayer(rootContainer)
    layers[layerType.ENEMY] = new EnemyLayer(rootContainer)
    layers[layerType.PLAYER] = new PlayerLayer(rootContainer)

    store.dispatch(action.goToLevel(1, {
      width: rootContainer.offsetWidth,
      height: rootContainer.offsetHeight
    }))
  },
  /**
   * Update the game state for each frame
   * @param  {Number} dt - The time difference since last run
   */
  update: (dt) => {
    layers.forEach((layer) => {
      layer.update(dt)
    })
  },
  /**
   * Render the game layers with current game state 
   */
  render: () => {
    layers.forEach((layer) => {
      if (layer.dirty) {
        layer.render()
      }
    })
  }
})

// Setup listeners
window.onload = window.onresize = function() {
  store.dispatch(action.updateDirty(true))
}

document.addEventListener('keydown', (evt) => {
  keyMap[evt.keyCode] = keyMap[evt.keyCode] || {
    keyCode: evt.keyCode
  }
  let keyState = keyMap[evt.keyCode]

  if (!keyState.press) {
    keyState.press = true
    switch (keyState.keyCode) {
      case 37: // Left
        store.dispatch(action.leftKeyDown())
        break
      case 38: // Up
        store.dispatch(action.upKeyDown())
        break
      case 39: // Right
        store.dispatch(action.rightKeyDown())
        break
      case 40: // Down
        store.dispatch(action.downKeyDown())
        break
    }
    
  }
})

document.addEventListener('keyup', (evt) => {
  keyMap[evt.keyCode] = keyMap[evt.keyCode] || {
    keyCode: evt.keyCode
  }
  let keyState = keyMap[evt.keyCode]

  keyState.press = false
})

game.start()