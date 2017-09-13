import {combineReducer} from './stateManager'
import {stateKey} from './enums'
import levelGenerator from './levelGenerator'
import Position from './components/Position'
import {
  GO_TO_LEVEL,
  UPDATE_DIRTY,
  RIGHT_KEY_DOWN,
  LEFT_KEY_DOWN,
  UP_KEY_DOWN,
  DOWN_KEY_DOWN,
  PLAYER_HIT_ENEMY,
  ENEMY_HIT_ENEMY,
  ENEMY_HIT_BLOCK,
  PLAYER_HIT_BLOCK
} from './action'

/*** Player Reducer ***/
const initPlayerState = {}

// Reducers
function playerReducer (state = initPlayerState, action = {}, storeState) {
  switch (action.type) {
    case GO_TO_LEVEL: { // ESLint: Need to wrap the case into block to use let/const in ES6
      const {playerConfig} = levelGenerator.createLevel(action.level)

      return Object.assign({}, state, {
        rows: playerConfig.rows,
        columns: playerConfig.columns,
        player: playerConfig.player,
        // Dirty is true so that we need to update state in layers
        dirty: true
      })
    }

    case UPDATE_DIRTY: {
      if (!action.stateKey || action.stateKey === stateKey.PLAYER) {
        return Object.assign({}, state, {
          dirty: action.isDirty
        })  
      }
      else {
        return state
      }
    }

    case RIGHT_KEY_DOWN: {
      state.player.moveRight()
      return Object.assign({}, state, {
        dirty: true
      })
    }

    case DOWN_KEY_DOWN: {
      state.player.moveDown()
      return Object.assign({}, state, {
        dirty: true
      })
    }

    case LEFT_KEY_DOWN: {
      state.player.moveLeft()
      return Object.assign({}, state, {
        dirty: true
      })
    }

    case UP_KEY_DOWN: {
      state.player.moveUp()
      return Object.assign({}, state, {
        dirty: true
      })
    }

    case PLAYER_HIT_ENEMY: {
      state.player.die()
      action.enemy.die()
      return Object.assign({}, state, {
        dirty: true
      })
    }

    case PLAYER_HIT_BLOCK: {
      let player = action.player,
          moveHistory = player.moveHistory

      // The last move is discarded when hitting block
      moveHistory.pop()

      player.moveTo(moveHistory[moveHistory.length - 1])
      return Object.assign({}, state, {
        dirty: true
      })
    }

    default:
      return state
  }
}

/*** Enemy Reducer ***/
const initEnemyState = {}

function enemyReducer (state = initEnemyState, action = {}, storeState) {
  switch (action.type) {
    case GO_TO_LEVEL: { // ESLint: Need to wrap the case into block to use let/const in ES6
      const {enemyConfig} = levelGenerator.createLevel(action.level)

      return Object.assign({}, state, {
        rows: enemyConfig.rows,
        columns: enemyConfig.columns,
        enemies: enemyConfig.enemies,
        // Dirty is true so that we need to update state in layers
        dirty: true
      })
    }

    case UPDATE_DIRTY: {
      if (!action.stateKey || action.stateKey === stateKey.ENEMY) {
        return Object.assign({}, state, {
          dirty: action.isDirty
        })  
      }
      else {
        return state
      }
    }

    case RIGHT_KEY_DOWN: {
      const blocks = storeState[stateKey.GAME_MAP].blocks

      state.enemies.forEach((enemy) => {
        if (enemy.isCopycat) {
          enemy.moveRight()
        }
        else {
          enemy.moveLeft()
        }
      })
      return Object.assign({}, state, {
        dirty: true
      })
    }

    case DOWN_KEY_DOWN: {
      const blocks = storeState[stateKey.GAME_MAP].blocks

      state.enemies.forEach((enemy) => {
        if (enemy.isCopycat) {
          enemy.moveDown()
        }
        else {
          enemy.moveUp()
        }
      })
      return Object.assign({}, state, {
        dirty: true
      })
    }

    case LEFT_KEY_DOWN: {
      const blocks = storeState[stateKey.GAME_MAP].blocks

      state.enemies.forEach((enemy) => {
        if (enemy.isCopycat) {
          enemy.moveLeft()
        }
        else {
          enemy.moveRight()
        }
      })
      return Object.assign({}, state, {
        dirty: true
      })
    }

    case UP_KEY_DOWN: {
      const blocks = storeState[stateKey.GAME_MAP].blocks

      state.enemies.forEach((enemy) => {
        if (enemy.isCopycat) {
          enemy.moveUp()
        }
        else {
          enemy.moveDown()
        }
      })
      return Object.assign({}, state, {
        dirty: true
      })
    }

    case ENEMY_HIT_ENEMY: {
      action.enemy1.die()
      action.enemy2.die()
      return Object.assign({}, state, {
        dirty: true
      })
    }

    case ENEMY_HIT_BLOCK: {
      let enemy = action.enemy,
          moveHistory = enemy.moveHistory

      // Enemy will change kind when hitting obstacle blocks
      enemy.toggleKind()

      // The last move is discarded when hitting block
      moveHistory.pop()
      enemy.moveTo(moveHistory[moveHistory.length - 1])
      return Object.assign({}, state, {
        dirty: true
      })
    }

    default:
      return state
  }
}

/*** Map Reducer ***/
const initGameMapState = {}

function gameMapReducer (state = initGameMapState, action = {}) {
  switch (action.type) {
    case GO_TO_LEVEL: { // ESLint: Need to wrap the case into block to use let/const in ES6
      const {gameMapConfig} = levelGenerator.createLevel(action.level)

      return Object.assign({}, state, {
        rows: gameMapConfig.rows,
        columns: gameMapConfig.columns,
        blocks: gameMapConfig.blocks,
        // Dirty is true so that we need to update state in layers
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

/*** Stat Reducer ***/
const initStatState = {}

function statReducer (state = initStatState, action = {}) {
  switch (action.type) {
    default:
      return state
  }
}

let reducerMap = {}
reducerMap[stateKey.PLAYER] = playerReducer
reducerMap[stateKey.ENEMY] = enemyReducer
reducerMap[stateKey.GAME_MAP] = gameMapReducer
reducerMap[stateKey.STAT] = statReducer

export default combineReducer(reducerMap)
