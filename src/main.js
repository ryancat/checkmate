import {createStore} from './stateManager'
import reducer from './reducer'
import gameLoop from './gameLoop'
import GameMapLayer from './layers/GameMapLayer'
import PlayerLayer from './layers/PlayerLayer'
import EnemyLayer from './layers/EnemyLayer'

import './main.scss'

// Create store for the game
let {dispatch} = createStore(reducer)
const rootContainer = document.getElementById('root')
let gameMapLayer = null
let playerLayer = null
let enemyLayer = null

let game = gameLoop({
  fps: 60,

  /**
   * Logic for init the game
   * - Create canvas layers
   * - Init game state
   */
  init: () => {
    gameMapLayer = new GameMapLayer({
      width: 800,
      height: 600
    }, rootContainer)

    playerLayer = new PlayerLayer({
      width: 800,
      height: 600
    }, rootContainer)

    enemyLayer = new EnemyLayer({
      width: 800,
      height: 600
    }, rootContainer)
  },

  update: () => {
  },

  render: () => {
  }
})

game.start()