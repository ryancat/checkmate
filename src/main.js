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
// let gameMapLayer = null
// let statLayer = null
// let playerLayer = null
// let enemyLayer = null

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

game.start()