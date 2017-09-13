export const GO_TO_LEVEL = 'GO_TO_LEVEL'
export const UPDATE_DIRTY = 'UPDATE_DIRTY'
export const RIGHT_KEY_DOWN = 'RIGHT_KEY_DOWN'
export const LEFT_KEY_DOWN = 'LEFT_KEY_DOWN'
export const UP_KEY_DOWN = 'UP_KEY_DOWN'
export const DOWN_KEY_DOWN = 'DOWN_KEY_DOWN'
export const PLAYER_HIT_ENEMY = 'PLAYER_HIT_ENEMY'
export const ENEMY_HIT_ENEMY = 'ENEMY_HIT_ENEMY'
export const ENEMY_HIT_BLOCK = 'ENEMY_HIT_BLOCK'
export const PLAYER_HIT_BLOCK = 'PLAYER_HIT_BLOCK'
export const ENEMY_TO_PLAYER = 'ENEMY_TO_PLAYER'
export const PLAYER_TO_ENEMY = 'PLAYER_TO_ENEMY'
export const PLAYER_HIT_PLAYER = 'PLAYER_HIT_PLAYER'

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

  playerHitEnemy: (enemy, player) => {
    return {
      type: PLAYER_HIT_ENEMY,
      enemy,
      player
    }
  },

  enemyHitEnemy: (enemy1, enemy2) => {
    return {
      type: ENEMY_HIT_ENEMY,
      enemy1,
      enemy2
    }
  },

  enemyHitBlock: (block, enemyRenderState) => {
    return {
      type: ENEMY_HIT_BLOCK,
      enemyRenderState,
      block
    }
  },

  playerHitBlock: (block, playerRenderState) => {
    return {
      type: PLAYER_HIT_BLOCK,
      playerRenderState,
      block
    }
  },

  enemyToPlayer: (enemyRenderState) => {
    return {
      type: ENEMY_TO_PLAYER,
      enemyRenderState
    }
  },

  playerToEnemy: (playerRenderState) => {
    return {
      type: PLAYER_TO_ENEMY,
      playerRenderState
    }
  },

  playerHitPlayer: (player1, player2) => {
    return {
      type: PLAYER_HIT_PLAYER,
      player1,
      player2
    }
  }
}