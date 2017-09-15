import store from './store'
import {action} from './action'
import gameLoop from './gameLoop'

import GameMapLayer from './layers/GameMapLayer'
import StatLayer from './layers/StatLayer'
import StoneLayer from './layers/StoneLayer'
import {layerType, blockType} from './enums'

import './main.scss'

const rootContainer = document.getElementById('root')
let layers = []
let keyMap = {}

// Helper function
function isStoneHit (stone1RenderState, stone2RenderState) {
  if (!stone1RenderState.stone.alive || !stone2RenderState.stone.alive) {
    return false
  }

  const stoneDistance = Math.pow(Math.pow(stone1RenderState.x - stone2RenderState.x, 2) + Math.pow(stone1RenderState.y - stone2RenderState.y, 2), 0.5)
  return stoneDistance < stone1RenderState.radius + stone2RenderState.radius
}

function checkHitBlock (stoneRenderState, gameMapRenderState) {
  if (!stoneRenderState.stone.alive) {
    return null
  }

  let blockRenderStates = gameMapRenderState.blockRenderStates,
      blockRenderStatesLength = blockRenderStates.length

  for (let i = 0; i < blockRenderStatesLength; i++) {
    let blockRenderState = blockRenderStates[i],
        distanceX = Math.abs(blockRenderState.x + blockRenderState.width / 2 - stoneRenderState.x),
        distanceY = Math.abs(blockRenderState.y + blockRenderState.height / 2 - stoneRenderState.y),
        isHitX = distanceX < blockRenderState.width / 2 + stoneRenderState.radius,
        isHitY = distanceY < blockRenderState.height / 2 + stoneRenderState.radius

    // TODO: bug - when block at transfer block, it can go into
    // other obstacle blocks
    if (isHitX && isHitY) {
      return blockRenderState.block
    }
  }

  return null
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
    // layers[layerType.ENEMY] = new EnemyLayer(rootContainer)
    // layers[layerType.PLAYER] = new PlayerLayer(rootContainer)
    layers[layerType.STONE] = new StoneLayer(rootContainer)

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
    let gameMapRenderState = layers[layerType.GAME_MAP].renderState,
        stonesRenderState = layers[layerType.STONE].renderState,
        stonesCount = stonesRenderState.length

    // Check if stone hit stone
    for (let i = 0; i < stonesCount; i++) {
      for (let j = 0; j < stonesCount; j++) {
        if (i === j) {
          continue
        }

        if (isStoneHit(stonesRenderState[i], stonesRenderState[j])) {
          store.dispatch(action.stoneHitStone(stonesRenderState[i].stone, stonesRenderState[j].stone))
        }
      }
    }

    // Check if any stone hit obstacle blocks
    stonesRenderState.forEach((stoneRenderState) => {
      let hitBlock = checkHitBlock(stoneRenderState, gameMapRenderState)
      if (hitBlock) {
        store.dispatch(action.stoneHitBlock(hitBlock, stoneRenderState))
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

// TODO LIST
// 1. Change 'TRANSFER_PLAYER' to 'TRANSFORM_PLAYER', and same to enemy
// 2.(Done) Merge enemy and player into the same array
// 3. Start with equal number of stones
// 4. Create bot to play with me
// 5. Create levels (with more enemies and less players)
