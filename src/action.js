export const GO_TO_LEVEL = 'GO_TO_LEVEL'
export const UPDATE_DIRTY = 'UPDATE_DIRTY'
export const RIGHT_KEY_DOWN = 'RIGHT_KEY_DOWN'
export const LEFT_KEY_DOWN = 'LEFT_KEY_DOWN'
export const UP_KEY_DOWN = 'UP_KEY_DOWN'
export const DOWN_KEY_DOWN = 'DOWN_KEY_DOWN'
export const PLAYER_HIT_ENEMY = 'PLAYER_HIT_ENEMY'
export const ENEMY_HIT_ENEMY = 'ENEMY_HIT_ENEMY'

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
  },

  rightKeyDown: () => {
    return {
      type: RIGHT_KEY_DOWN,
      dirty: true
    }
  },

  leftKeyDown: () => {
    return {
      type: LEFT_KEY_DOWN,
      dirty: true
    }
  },

  upKeyDown: () => {
    return {
      type: UP_KEY_DOWN,
      dirty: true
    }
  },

  downKeyDown: () => {
    return {
      type: DOWN_KEY_DOWN,
      dirty: true
    }
  },

  playerHitEnemy: (enemy) => {
    return {
      type: PLAYER_HIT_ENEMY,
      enemy
    }
  },

  enemyHitEnemy: (enemy1, enemy2) => {
    return {
      type: ENEMY_HIT_ENEMY,
      enemy1,
      enemy2
    }
  }
}