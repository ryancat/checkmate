export function createStore (reducer) {
  // Init state
  let state = reducer()

  return {
    /**
     * Dispatch action to trigger state changes
     */
    dispatch: (action = {}) => {
      // Update state
      state = reducer(state, action)
      // State manager doesn't care about noticing
      // game to update state. Instead reducers
      // should set dirty state for game loop to
      // trigger update
    },
    /**
     * Return the current state for given key
     * This is to allow application to 'connect' to state
     */
    getState: (stateKey) => {
      if (!stateKey) {
        return state
      }
      else {
        return state[stateKey]
      }
    }
  }
}

// Assume the recuerMap is a flat map to all reducers
export function combineReducer (reducerMap = {}) {
  return (state = {}, action = {}) => {
    for (let key in reducerMap) {
      state[key] = reducerMap[key](state[key], action)
    }
    return state
  }
}