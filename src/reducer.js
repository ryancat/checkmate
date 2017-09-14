import store from './store'
import {combineReducer} from './stateManager'
import {stateKey, blockType, stoneType} from './enums'
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
  PLAYER_HIT_PLAYER,

  STONE_HIT_STONE,
  STONE_HIT_BLOCK
} from './action'

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

/*** Stong reducer ***/
const initStoneState = {}

function stoneReducer (state = initStoneState, action = {}) {
  switch (action.type) {
    case GO_TO_LEVEL: { // ESLint: Need to wrap the case into block to use let/const in ES6
      const {enemyConfig, playerConfig, gameMapConfig} = levelGenerator.createLevel(action.level)

      return Object.assign({}, state, {
        rows: gameMapConfig.rows,
        columns: gameMapConfig.columns,
        enemies: enemyConfig.enemies,
        players: playerConfig.players,
        // Dirty is true so that we need to update state in layers
        dirty: true
      })
    }

    case UPDATE_DIRTY: {
      if (!action.stateKey) {
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
        // store.dispatch(actions.enemyToPlayer(stoneRenderState))
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
    default:
      return state
  }
}

let reducerMap = {}
reducerMap[stateKey.GAME_MAP] = gameMapReducer
reducerMap[stateKey.STAT] = statReducer
reducerMap[stateKey.STONE] = stoneReducer

export default combineReducer(reducerMap)
