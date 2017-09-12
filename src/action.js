export const GO_TO_LEVEL = 'GO_TO_LEVEL'
export const UPDATE_DIRTY = 'UPDATE_DIRTY'

export const action = {
  goToLevel: (level, gameEnv = {}) => {
    return {
      type: GO_TO_LEVEL,
      level,
      gameEnv
    }
  },

  updateDirty: (isDirty, stateKey) => {
    return {
      type: UPDATE_DIRTY,
      stateKey,
      isDirty
    }
  }
}