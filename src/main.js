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

// For mobile
let touches
function resetTouches () {
  touches = {
    touchstart: Object.assign({}, {
      x: -1,
      y: -1
    }),
    touchmove: Object.assign({}, {
      x: -1,
      y: -1
    })
  }
}
resetTouches()

function handleTouch (evt) {
  if (typeof evt.touches === 'undefined') {
    return 
  }

  let touch = evt.touches[0]
  switch (evt.type) {
    case 'touchstart':
    case 'touchmove':
      touches[evt.type].x = touch.pageX
      touches[evt.type].y = touch.pageY
      break

    case 'touchend': {
      if (touches.touchstart.x > -1 && touches.touchmove.x > -1) {
        let dx = touches.touchmove.x - touches.touchstart.x,
            dy = touches.touchmove.y - touches.touchstart.y

        if (Math.abs(dx) > Math.abs(dy)) {
          // Horizontal move
          if (dx > 0) {
            store.dispatch(action.rightKeyDown())
          }
          else {
            store.dispatch(action.leftKeyDown())
          }
        }
        else {
          // Vertical move
          if (dy > 0) {
            store.dispatch(action.downKeyDown())
          }
          else {
            store.dispatch(action.upKeyDown())
          }
        }
      }
      break
    }
  }
}

document.addEventListener('touchstart', handleTouch)
document.addEventListener('touchmove', handleTouch)
document.addEventListener('touchend', handleTouch)

game.start()