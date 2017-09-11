import {combineReducer} from './stateManager'
import {stateKey} from './enums'
import levelGenerator from './levelGenerator'
import {
  GO_TO_LEVEL
} from './action'

/*** Player Reducer ***/
const initPlayerState = {}

function playerReducer (state = initPlayerState, action = {}) {
  switch (action.type) {
    case GO_TO_LEVEL: { // ESLint: Need to wrap the case into block to use let/const in ES6
      // console.log(action)
      const {levelPlayerState} = levelGenerator.createLevel(action.level)
      return Object.assign({}, levelPlayerState, {
        // Dirty is true so that we need to update state in layers
        dirty: true
      })
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
      // console.log(action)
      const {levelEnemyState} = levelGenerator.createLevel(action.level)
      return Object.assign({}, levelEnemyState, {
        // Dirty is true so that we need to update state in layers
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
      // console.log(action)
      const {levelGameMapState} = levelGenerator.createLevel(action.level)
      return Object.assign({}, levelGameMapState, {
        // Dirty is true so that we need to update state in layers
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