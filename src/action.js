export const GO_TO_LEVEL = 'GO_TO_LEVEL'

export const action = {
  goToLevel: (level, gameEnv = {}) => {
    return {
      type: GO_TO_LEVEL,
      level,
      gameEnv
    }
  }
}