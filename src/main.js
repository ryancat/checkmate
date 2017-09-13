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

// Helper function
function isStoneHit(stone1RenderState, stone2RenderState) {
  if (!stone1RenderState.stone.alive || !stone2RenderState.stone.alive) {
    return false
  }
  
  const stoneDistance = Math.pow(Math.pow(stone1RenderState.x - stone2RenderState.x, 2) + Math.pow(stone1RenderState.y - stone2RenderState.y, 2), 0.5)
  return stoneDistance < stone1RenderState.radius + stone2RenderState.radius
}

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
  update: () => {
    layers.forEach((layer) => {
      layer.update()
    })
  },
  /**
   * Render the game layers with current game state 
   */
  render: (dt) => {
    layers.forEach((layer) => {
      layer.render(dt)
    })

    // Check the render result to see if there is any collision
    // Check if player hit enemy
    let playerRenderState = layers[layerType.PLAYER].renderState,
        enemiesRenderState = layers[layerType.ENEMY].renderState,
        enemyCount = enemiesRenderState.length

    enemiesRenderState.forEach((enemyRenderState) => {
      if (isStoneHit(playerRenderState, enemyRenderState)) {
        store.dispatch(action.playerHitEnemy(enemyRenderState.stone))
      }
    })

    // Check if enemy hit each other
    enemiesRenderState.forEach((enemyRenderState) => {
      if (isStoneHit(playerRenderState, enemyRenderState)) {
        store.dispatch(action.playerHitEnemy(enemyRenderState.stone))
      }
    })

    for (let i = 0; i < enemyCount; i++) {
      for (let j = 0; j < enemyCount; j++) {
        if (i === j) {
          continue
        }

        if (isStoneHit(enemiesRenderState[i], enemiesRenderState[j])) {
          store.dispatch(action.enemyHitEnemy(enemiesRenderState[i].stone, enemiesRenderState[j].stone))
        }
      }
    }
    
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
let touches = {
  touchstart: Object.assign({}, {
    x: -1,
    y: -1
  }),
  touchmove: Object.assign({}, {
    x: -1,
    y: -1
  })
}

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