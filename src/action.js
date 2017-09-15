import store from './store'
import {stateKey} from './enums'

export const GO_TO_LEVEL = 'GO_TO_LEVEL'
export const UPDATE_DIRTY = 'UPDATE_DIRTY'
export const RIGHT_KEY_DOWN = 'RIGHT_KEY_DOWN'
export const LEFT_KEY_DOWN = 'LEFT_KEY_DOWN'
export const UP_KEY_DOWN = 'UP_KEY_DOWN'
export const DOWN_KEY_DOWN = 'DOWN_KEY_DOWN'
export const STONE_HIT_STONE = 'STONE_HIT_STONE'
export const STONE_HIT_BLOCK = 'STONE_HIT_BLOCK'
export const PLAYER_ALL_DIE = 'PLAYER_ALL_DIE'
export const ENEMY_ALL_DIE = 'ENEMY_ALL_DIE'
export const RENDER_STATE_CLEAR = 'RENDER_STATE_CLEAR'
export const SHOW_MESSAGE = 'SHOW_MESSAGE'
export const HIDE_MESSAGE = 'HIDE_MESSAGE'
export const CHANGE_TURN = 'CHANGE_TURN'

export const action = {
  goToLevel: (level, cleanCache) => {
    return {
      type: GO_TO_LEVEL,
      level,
      cleanCache
    }
  },

  showMessage: () => {
    return {
      type: SHOW_MESSAGE
    }
  },

  hideMessage: () => {
    return {
      type: HIDE_MESSAGE
    }
  },

  changeTurn: (isPlayerTurn) => {
    return {
      type: CHANGE_TURN,
      isPlayerTurn
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

  stoneHitStone: (stone1, stone2) => {
    return {
      type: STONE_HIT_STONE,
      stone1,
      stone2
    }
  },

  stoneHitBlock: (block, stoneRenderState) => {
    return {
      type: STONE_HIT_BLOCK,
      stoneRenderState,
      block
    }
  },

  playerAllDie: (isAllDie) => {
    return {
      type: PLAYER_ALL_DIE,
      isAllDie
    }
  },

  enemyAllDie: (isAllDie) => {
    return {
      type: ENEMY_ALL_DIE,
      isAllDie
    }
  },

  renderStateClear: (layerType) => {
    return {
      type: RENDER_STATE_CLEAR,
      layerType
    }
  }
}