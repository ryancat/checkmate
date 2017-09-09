import {combineReducer} from './stateManager'

/*** Player Reducer ***/
const initPlayerState = {
  dirty: false
}

function playerReducer (state = initPlayerState, action = {}) {
  switch (action.type) {
    default:
      return state
  }
}

/*** Enemy Reducer ***/
const initEnemyState = {
  dirty: false
}

function enemyReducer (state = initEnemyState, action = {}) {
  switch (action.type) {
    default:
      return state
  }
}

/*** Map Reducer ***/
const initMapState = {
  dirty: false
}

function mapReducer (state = initMapState, action = {}) {
  switch (action.type) {
    default:
      return state
  }
}

/*** Stat Reducer ***/
const initStatState = {
  dirty: false
}

function statReducer (state = initStatState, action = {}) {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducer({
  player: playerReducer,
  enemy: enemyReducer,
  map: mapReducer,
  stat: statReducer
})

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