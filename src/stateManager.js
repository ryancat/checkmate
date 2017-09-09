export function createStore (reducer) {
  // Init store
  let store = reducer()

  return {
    /**
     * Dispatch action to trigger state changes
     */
    dispatch: (action) => {
      // Update store
      store = reducer(store, action)
      // State manager doesn't care about noticing
      // game to update state. Instead reducers
      // should set dirty state for game loop to
      // trigger update
    },

    store
  }
}

export function combineReducer (reducerMap = {}) {
  return (state = {}, action) => {
    for (let key in reducerMap) {
      state[key] = reducerMap[key](state[key], action)
    }

    return state
  }
}