import store from './store'
import {combineReducer} from './stateManager'
import {stateKey, blockType, stoneType, layerType} from './enums'
import levelGenerator from './levelGenerator'
import Position from './components/Position'
import Player from './components/Player'
import Enemy from './components/Enemy'
import {
  action as actions,
  GO_TO_LEVEL,
  UPDATE_DIRTY,
  RIGHT_KEY_DOWN,
  LEFT_KEY_DOWN,
  UP_KEY_DOWN,
  DOWN_KEY_DOWN,
  STONE_HIT_STONE,
  STONE_HIT_BLOCK,
  PLAYER_ALL_DIE,
  ENEMY_ALL_DIE,
  RENDER_STATE_CLEAR,
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  CHANGE_TURN
} from './action'

/*** Map Reducer ***/
const initGameMapState = {}

function gameMapReducer (state = initGameMapState, action = {}) {
  switch (action.type) {
    case GO_TO_LEVEL: { // ESLint: Need to wrap the case into block to use let/const in ES6
      const {gameMapConfig} = levelGenerator.createLevel(action.level, action.cleanCache)

      return Object.assign({}, state, {
        rows: gameMapConfig.rows,
        columns: gameMapConfig.columns,
        blocks: gameMapConfig.blocks,
        clearRenderState: true,
        isPlayerTurn: true,
        // Dirty is true so that we need to update state in layers
        dirty: true
      })
    }

    case RENDER_STATE_CLEAR: {
      if (action.layerType === layerType.GAME_MAP) {
        return Object.assign({}, state, {
          clearRenderState: false,
          dirty: true
        })
      }
      else {
        return state
      }
    }

    case CHANGE_TURN: {
      return Object.assign({}, state, {
        isPlayerTurn: action.isPlayerTurn,
        dirty: true
      }) 
    }

    case UPDATE_DIRTY: {
      if (!action.stateKey || action.stateKey === stateKey.GAME_MAP) {
        return Object.assign({}, state, {
          dirty: action.isDirty
        })  
      }
      else {
        return state
      }
    }

    default:
      return state
  }
}

/*** Stong reducer ***/
const initStoneState = {}

function stoneReducer (state = initStoneState, action = {}) {
  switch (action.type) {
    case GO_TO_LEVEL: { // ESLint: Need to wrap the case into block to use let/const in ES6
      const {enemyConfig, playerConfig, gameMapConfig} = levelGenerator.createLevel(action.level, action.cleanCache)

      return Object.assign({}, state, {
        rows: gameMapConfig.rows,
        columns: gameMapConfig.columns,
        enemies: enemyConfig.enemies,
        players: playerConfig.players,
        blocks: gameMapConfig.blocks,
        clearRenderState: true,
        isPlayerTurn: true,
        // Dirty is true so that we need to update state in layers
        dirty: true
      })
    }

    case RENDER_STATE_CLEAR: {
      if (action.layerType === layerType.STONE) {
        return Object.assign({}, state, {
          clearRenderState: false,
          dirty: true
        })
      }
      else {
        return state
      }
    }

    case CHANGE_TURN: {
      let {isPlayerTurn} = action,
          {enemies, players, blocks} = state
      
      if (!isPlayerTurn) {
        setTimeout(() => {
          // Need to play as enemy
          // GREEDY ENEMIES!!
          let moveUpScore = 0,
              moveDownScore = 0,
              moveLeftScore = 0,
              moveRightScore = 0

          let playerPositions = players.filter((player) => player.alive).map((player) => player.position),
              transferPlayerBlockPositions = blocks.filter((block) => block.type === blockType.TRANSFER_PLAYER)
          
          enemies = enemies.filter((enemy) => enemy.alive)
          enemies.forEach((enemy) => {
            let {column, row} = enemy.position
            // If move up
            moveUpScore += playerPositions.filter((playerPosition) => playerPosition.column === column && playerPosition.row === row - 1).length
            moveUpScore -= 2 * transferPlayerBlockPositions.filter((blockPosition) => blockPosition.column === column && blockPosition.row === row - 1).length
            // If move down
            moveDownScore += playerPositions.filter((playerPosition) => playerPosition.column === column && playerPosition.row === row + 1).length
            moveDownScore -= 2 * transferPlayerBlockPositions.filter((blockPosition) => blockPosition.column === column && blockPosition.row === row + 1).length
            // If move left
            moveLeftScore += playerPositions.filter((playerPosition) => playerPosition.row === row && playerPosition.column === column - 1).length
            moveLeftScore -= 2 * transferPlayerBlockPositions.filter((blockPosition) => blockPosition.row === row && blockPosition.column === column - 1).length
            // If move right
            moveRightScore += playerPositions.filter((playerPosition) => playerPosition.row === row && playerPosition.column === column + 1).length
            moveRightScore -= 2 * transferPlayerBlockPositions.filter((blockPosition) => blockPosition.row === row && blockPosition.column === column + 1).length
          })

          // Random move on the top scores directions
          let maxScore = Math.max(moveUpScore, moveDownScore, moveLeftScore, moveRightScore),
              maxScoreMoves = []

          if (maxScore === moveUpScore) {
            maxScoreMoves.push('up')
          }
          
          if (maxScore === moveRightScore) {
            maxScoreMoves.push('right')
          }
          
          if (maxScore === moveDownScore) {
            maxScoreMoves.push('down')
          }
          
          if (maxScore === moveLeftScore) {
            maxScoreMoves.push('left')
          }

          let numOfPossibleMoves = maxScoreMoves.length,
              chance = Math.random()

          for (let i = 0; i < numOfPossibleMoves; i++) {

            if (chance < (i + 1) / numOfPossibleMoves) {
              switch (maxScoreMoves[i]) {
                case 'up': 
                  return store.dispatch(actions.downKeyDown())

                case 'right':
                  return store.dispatch(actions.leftKeyDown())

                case 'down':
                  return store.dispatch(actions.upKeyDown())

                case 'left':
                  return store.dispatch(actions.rightKeyDown())

                default:
                  return store.dispatch(actions.downKeyDown())
              }
            }
          } 

        }, 1000)
      }

      return Object.assign({}, state, {
        isPlayerTurn,
        dirty: true
      }) 
    }

    case UPDATE_DIRTY: {
      if (!action.stateKey || action.stateKey === stateKey.STONE) {
        return Object.assign({}, state, {
          dirty: action.isDirty
        })  
      }
      else {
        return state
      }
    }

    case RIGHT_KEY_DOWN: {
      state.players.forEach((player) => player.moveRight())
      state.enemies.forEach((enemy) => enemy.moveLeft())

      return Object.assign({}, state, {
        dirty: true
      })
    }

    case DOWN_KEY_DOWN: {
      state.players.forEach((player) => player.moveDown())
      state.enemies.forEach((enemy) => enemy.moveUp())

      return Object.assign({}, state, {
        dirty: true
      })
    }

    case LEFT_KEY_DOWN: {
      state.players.forEach((player) => player.moveLeft())
      state.enemies.forEach((enemy) => enemy.moveRight())

      return Object.assign({}, state, {
        dirty: true
      })
    }

    case UP_KEY_DOWN: {
      state.players.forEach((player) => player.moveUp())
      state.enemies.forEach((enemy) => enemy.moveDown())
      
      return Object.assign({}, state, {
        dirty: true
      })
    }

    case STONE_HIT_STONE: {
      let {stone1, stone2} = action
      // When stone hit stone, they turn around if they are of
      // the same kind, otherwise they all die
      if (stone1.type === stone2.type) {
        stone1.moveBack()
        stone2.moveBack()  
      }
      else {
        stone1.die()
        stone2.die()
      }
      
      return Object.assign({}, state, {
        dirty: true
      })
    }

    case STONE_HIT_BLOCK: {
      let {stoneRenderState, block} = action,
          stone = stoneRenderState.stone,
          moveHistory = stone.moveHistory

      if (block.type === blockType.BLOCK) {
        // Enemy will move back when hitting obstacle blocks
        stone.moveBack()
      }
      else if (block.type === blockType.TRANSFER_PLAYER
        && stone.type === stoneType.ENEMY) {
        // Enemy stone hit a transform player block, it will become
        // a player
        let enemyIndex = state.enemies.indexOf(stone)
        state.enemies.splice(enemyIndex, 1)
        state.players.push(stone)
        stone.toggleType()
      }
      else if (block.type === blockType.TRANSFER_ENEMY
        && stone.type === stoneType.PLAYER) {
        // Player stone hit a transform enemy block, it will become
        // a enemy
        let playerIndex = state.players.indexOf(stone)
        state.players.splice(playerIndex, 1)
        state.enemies.push(stone)
        stone.toggleType()
      }

      return Object.assign({}, state, {
        dirty: true
      })
    }

    default:
      return state
  } 
}

/*** Stat Reducer ***/
const initStatState = {}

function statReducer (state = initStatState, action = {}) {
  switch (action.type) {
    case GO_TO_LEVEL: { // ESLint: Need to wrap the case into block to use let/const in ES6
      const {enemyConfig, playerConfig, gameMapConfig} = levelGenerator.createLevel(action.level, action.cleanCache)

      return Object.assign({}, state, {
        rows: gameMapConfig.rows,
        columns: gameMapConfig.columns,
        enemies: enemyConfig.enemies,
        players: playerConfig.players,
        level: action.level,
        move: 0,
        directions: [],
        playerAllDie: false,
        enemyAllDie: false,
        clearRenderState: true,
        isPlayerTurn: true,
        // Dirty is true so that we need to update state in layers
        dirty: true
      })
    }

    case RENDER_STATE_CLEAR: {
      if (action.layerType === layerType.STAT) {
        return Object.assign({}, state, {
          clearRenderState: false,
          dirty: true
        })
      }
      else {
        return state
      }
    }

    case CHANGE_TURN: {
      return Object.assign({}, state, {
        isPlayerTurn: action.isPlayerTurn,
        dirty: true
      }) 
    }

    case UPDATE_DIRTY: {
      if (!action.stateKey || action.stateKey === stateKey.STAT) {
        return Object.assign({}, state, {
          dirty: action.isDirty
        })  
      }
      else {
        return state
      }
    }

    case RIGHT_KEY_DOWN: {
      let {move, directions, isPlayerTurn} = state
      move++
      directions.push(isPlayerTurn ? String.fromCharCode(9654) : String.fromCharCode(9664))
      setTimeout(() => {
        store.dispatch(actions.changeTurn(move % 2 === 0))
      })

      return Object.assign({}, state, {
        directions,
        move,
        dirty: true
      })
    }

    case DOWN_KEY_DOWN: {
      let {move, directions, isPlayerTurn} = state
      move++
      directions.push(isPlayerTurn ? String.fromCharCode(9660) : String.fromCharCode(9650))
      setTimeout(() => {
        store.dispatch(actions.changeTurn(move % 2 === 0))
      })

      return Object.assign({}, state, {
        directions,
        move,
        dirty: true
      })
    }

    case LEFT_KEY_DOWN: {
      let {move, directions, isPlayerTurn} = state
      move++
      directions.push(isPlayerTurn ? String.fromCharCode(9664) : String.fromCharCode(9654))
      setTimeout(() => {
        store.dispatch(actions.changeTurn(move % 2 === 0))
      })

      return Object.assign({}, state, {
        directions,
        move,
        dirty: true
      })
    }

    case UP_KEY_DOWN: {
      let {move, directions, isPlayerTurn} = state
      move++
      directions.push(isPlayerTurn ? String.fromCharCode(9650): String.fromCharCode(9660))
      setTimeout(() => {
        store.dispatch(actions.changeTurn(move % 2 === 0))
      })

      return Object.assign({}, state, {
        directions,
        move,
        dirty: true
      })
    }

    case PLAYER_ALL_DIE: {
      return Object.assign({}, state, {
        playerAllDie: action.isAllDie,
        dirty: true
      }) 
    }

    case ENEMY_ALL_DIE: {
      return Object.assign({}, state, {
        enemyAllDie: action.isAllDie,
        dirty: true
      }) 
    }

    default:
      return state
  }
}

let initMessageState = {}

function messageReducer (state = initMessageState, action = {}) {
  switch (action.type) {
    case SHOW_MESSAGE: {
      return Object.assign({}, state, {
        showMessage: true,
        gameTitle: 'Checkmate!',
        gameIntro: 'You are the WHITE stones and computer will be the BLAKC ones. Move your stones with arrow keys, but all enemies will move on the OPPOSITE direction with you. Hit enemies will perish both stones, so use it wisely... You can also use the super power from transform blocks to turn one stone to another! Whoever stays WIN!',
        dirty: true
      })
    }

    case HIDE_MESSAGE: {
      return Object.assign({}, state, {
        showMessage: false,
        dirty: true
      })
    }

    case UPDATE_DIRTY: {
      if (!action.stateKey || action.stateKey === stateKey.MESSAGE) {
        return Object.assign({}, state, {
          dirty: action.isDirty
        })  
      }
      else {
        return state
      }
    }

    default:
      return state
  }
}

let reducerMap = {}
reducerMap[stateKey.GAME_MAP] = gameMapReducer
reducerMap[stateKey.STAT] = statReducer
reducerMap[stateKey.STONE] = stoneReducer
reducerMap[stateKey.MESSAGE] = messageReducer

export default combineReducer(reducerMap)
