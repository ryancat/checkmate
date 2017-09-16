import BaseLayer from './BaseLayer'
import {defaultTheme} from '../theme'

import store from '../store'
import {action} from '../action'
import {stateKey, layerType} from '../enums'

export default class StatLayer extends BaseLayer {
  constructor (container) {
    super(container)
    this.type = layerType.STAT
    this.stateKey = stateKey.STAT

    // Make sure context is correct
    this.handleClick = this.handleClick.bind(this)

    document.addEventListener('click', this.handleClick)
    document.addEventListener('touchend', this.handleClick)
  }

  handleClick (evt) {
    let {playerAllDie, enemyAllDie, level} = this.renderState
    if (playerAllDie) {
      // This will trigger retry
      store.dispatch(action.goToLevel(level, true))
    }
    else if (enemyAllDie) {
      // This will trigger next level
      store.dispatch(action.goToLevel(level + 1, true))
    }
  }

  update () {
    let newState = store.getState(this.stateKey)
    // Do nothing if the state is dirty
    if (!newState.dirty) {
      return
    }

    this.finalRenderState = newState

    if (newState.clearRenderState) {
      this.renderState = null
      store.dispatch(action.renderStateClear(this.type))
    }

    // We have computed final render state based on new state
    store.dispatch(action.updateDirty(false, this.stateKey))
    // Now that we have new final render state, we need to let
    // render function to take care of rendering it
    this.dirty = true
  }

  render (dt) {
    if (!this.dirty) {
      return
    }

    if (!this.renderState) {
      this.renderState = Object.assign({}, this.finalRenderState)
    }

    // There is no animated change after initial render for game map
    this.renderState = Object.assign({}, this.finalRenderState)
    this.dirty = false

    let width = this.container.offsetWidth,
        height = this.container.offsetHeight,
        ctx = this.context,
        {
          level, 
          move, 
          directions,
          playerAllDie,
          enemyAllDie,
          isPlayerTurn
        } = this.renderState

    this.element.width = width
    this.element.height = height

    ctx.fillStyle = defaultTheme.STAT_BACKGROUND_COLOR
    ctx.fillRect(0, height * 0.9, width, height)

    // Get stat information
    let levelInfo = 'Level: ' + level,
        turnInfo = (isPlayerTurn ? 'Your' : 'Enemy\'s') + ' turn',
        moveInfo = 'Move: ' + move,
        statInfo = levelInfo + ' | ' + turnInfo + ' | ' + moveInfo,
        directionsInfo = directions.join('')

    ctx.fillStyle = defaultTheme.FONT_COLOR
    ctx.font = height * 0.03 + 'px ' + defaultTheme.FONT

    ctx.fillText(statInfo, 
      (width - ctx.measureText(statInfo).width) * 0.5,
      height * 0.945)

    // Make sure the directions are not too long
    ctx.font = height * 0.025 + 'px ' + defaultTheme.FONT
    while (ctx.measureText(directionsInfo).width > width - 20) {
      directionsInfo = directionsInfo.slice(1)
    } 

    let directionsCount = directionsInfo.length,
        isPlayerMove = move % 2 === 1

    for (let i = 0; i < directionsCount; i++) {
      let textStartX = 10 + ctx.measureText(directionsInfo.slice(0, i)).width

      if ((move - directionsCount + i) % 2 === 0) {
        ctx.fillStyle = defaultTheme.PLAYER_COLOR
      }
      else {
        ctx.fillStyle = defaultTheme.ENEMY_COLOR
      }
      ctx.fillText(directionsInfo[i], textStartX, height * 0.975)
    }

    // If player all die, show game over layer
    if (playerAllDie) {
      ctx.fillStyle = defaultTheme.GAME_OVER_BACKGROUND
      ctx.fillRect(0, 0, width, height)

      let loseText = 'You lose'
      ctx.fillStyle = defaultTheme.ENEMY_COLOR
      ctx.font = height * 0.1 + 'px ' + defaultTheme.FONT
      ctx.fillText(
        loseText, 
        (width - ctx.measureText(loseText).width) * 0.5,
        (height + height * 0.1) * 0.5)

      let retryText = 'Click to retry'
      ctx.fillStyle = defaultTheme.ENEMY_COLOR
      ctx.font = height * 0.03 + 'px ' + defaultTheme.FONT
      ctx.fillText(
        retryText, 
        (width - ctx.measureText(retryText).width) * 0.5,
        (height + height * 0.2) * 0.5)
    }
    else if (enemyAllDie) {
      ctx.fillStyle = defaultTheme.GAME_WIN_BACKGROUND
      ctx.fillRect(0, 0, width, height)

      let winText = 'Level ' + level + ' clear!'
      ctx.fillStyle = defaultTheme.PLAYER_COLOR
      ctx.font = height * 0.1 + 'px ' + defaultTheme.FONT
      ctx.fillText(
        winText, 
        (width - ctx.measureText(winText).width) * 0.5,
        (height + height * 0.1) * 0.5)

      let nextLevelText = 'Click to next level'
      ctx.fillStyle = defaultTheme.PLAYER_COLOR
      ctx.font = height * 0.03 + 'px ' + defaultTheme.FONT
      ctx.fillText(
        nextLevelText, 
        (width - ctx.measureText(nextLevelText).width) * 0.5,
        (height + height * 0.2) * 0.5)
    }
  }
}