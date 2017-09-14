import store from './store'
import {combineReducer} from './stateManager'
import {stateKey, blockType} from './enums'
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
  PLAYER_HIT_ENEMY,
  ENEMY_HIT_ENEMY,
  ENEMY_HIT_BLOCK,
  PLAYER_HIT_BLOCK,
  ENEMY_TO_PLAYER,
  PLAYER_TO_ENEMY,
  PLAYER_HIT_PLAYER
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
        players: playerConfig.players,
        newRenderStates: [],
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
      state.players.forEach((player) => player.moveRight())
      return Object.assign({}, state, {
        dirty: true
      })
    }

    case DOWN_KEY_DOWN: {
      state.players.forEach((player) => player.moveDown())
      return Object.assign({}, state, {
        dirty: true
      })
    }

    case LEFT_KEY_DOWN: {
      state.players.forEach((player) => player.moveLeft())
      return Object.assign({}, state, {
        dirty: true
      })
    }

    case UP_KEY_DOWN: {
      state.players.forEach((player) => player.moveUp())
      return Object.assign({}, state, {
        dirty: true
      })
    }

    case PLAYER_HIT_ENEMY: {
      action.player.die()
      action.enemy.die()
      return Object.assign({}, state, {
        dirty: true
      })
    }

    case PLAYER_HIT_BLOCK: {
      let {playerRenderState, block} = action,
          player = playerRenderState.stone,
          moveHistory = player.moveHistory

      if (block.type === blockType.BLOCK) {
        // Enemy will move back when hitting obstacle blocks
        player.moveBack()
      }
      else if (block.type === blockType.TRANSFER_ENEMY) {
        // enemy.setCopycat(true)
        let playerIndex = state.players.indexOf(player)
        state.players.splice(playerIndex, 1)
        store.dispatch(actions.playerToEnemy(playerRenderState))
      }

      return Object.assign({}, state, {
        dirty: true
      })
    }

    case PLAYER_HIT_PLAYER: {
      let {player1, player2} = action
      // When player hit player, they turn around
      player1.moveBack()
      player2.moveBack()
      
      return Object.assign({}, state, {
        dirty: true
      })
    }

    case ENEMY_TO_PLAYER: {
      let {enemyRenderState} = action,
          enemy = enemyRenderState.stone,
          newPlayer = new Player({
            row: enemy.position.row,
            column: enemy.position.column,
            moveHistory: enemy.moveHistory,
            alive: enemy.alive
          })

      enemyRenderState.stone = newPlayer
      state.players.push(newPlayer)
      state.newRenderStates.push(enemyRenderState)
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
        newRenderStates: [],
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
      let {enemy1, enemy2} = action
      // When enemy hit enemy, they turn around
      enemy1.moveBack()
      enemy2.moveBack()
      return Object.assign({}, state, {
        dirty: true
      })
    }

    case ENEMY_HIT_BLOCK: {
      let {enemyRenderState, block} = action,
          enemy = enemyRenderState.stone,
          moveHistory = enemy.moveHistory

      if (block.type === blockType.BLOCK) {
        // Enemy will move back when hitting obstacle blocks
        enemy.moveBack()
      }
      else if (block.type === blockType.TRANSFER_PLAYER) {
        // enemy.setCopycat(true)
        let enemyIndex = state.enemies.indexOf(enemy)
        state.enemies.splice(enemyIndex, 1)
        store.dispatch(actions.enemyToPlayer(enemyRenderState))
      }

      return Object.assign({}, state, {
        dirty: true
      })
    }

    case PLAYER_TO_ENEMY: {
      let {playerRenderState} = action,
          player = playerRenderState.stone,
          newEnemy = new Enemy({
            row: player.position.row,
            column: player.position.column,
            moveHistory: player.moveHistory,
            alive: player.alive
          })

      playerRenderState.stone = newEnemy
      state.enemies.push(newEnemy)
      state.newRenderStates.push(playerRenderState)
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
