import {combineReducer} from './stateManager'
import {stateKey} from './enums'
import levelGenerator from './levelGenerator'
import Position from './components/Position'
import {
  GO_TO_LEVEL,
  UPDATE_DIRTY
} from './action'

/*** Player Reducer ***/
const initPlayerState = {}

function playerReducer (state = initPlayerState, action = {}) {
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

    default:
      return state
  }
}

/*** Enemy Reducer ***/
const initEnemyState = {}

function enemyReducer (state = initEnemyState, action = {}) {
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

// const reducer1 = (state = {}, action) => {

//   switch (action.type) {
//     case 'a':
//       return Object.assign({}, state, {
//         id: 'a'
//       })
//       break

//     default:
//       return state
//   }

// }

// const reducer2 = (state = {}, action) => {

//   switch (action.type) {
//     case 'a':
//       return Object.assign({}, state, {
//         id: 'a'
//       })
//       break

//     default:
//       return state
//   }

// }