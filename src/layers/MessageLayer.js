import BaseLayer from './BaseLayer'
import {defaultTheme} from '../theme'

import store from '../store'
import {action} from '../action'
import {stateKey, layerType} from '../enums'
import {drawTextInWidth} from '../shapes/text'

export default class MessageLayer extends BaseLayer {
  constructor (container) {
    super(container)
    this.type = layerType.MESSAGE
    this.stateKey = stateKey.MESSAGE

    // Make sure context is correct
    this.handleClick = this.handleClick.bind(this)

    document.addEventListener('click', this.handleClick)
    document.addEventListener('touchend', this.handleClick)
  }

  handleClick (evt) {
    store.dispatch(action.hideMessage())
  }

  update () {
    let newState = store.getState(this.stateKey)
    // Do nothing if the state is dirty
    if (!newState.dirty) {
      return
    }

    this.finalRenderState = newState

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
          gameTitle,
          gameIntro,
          showMessage
        } = this.renderState

    this.element.width = width
    this.element.height = height

    
    ctx.fillStyle = defaultTheme.MESSAGE_BACKGROUND_COLOR
    ctx.fillRect(0, 0, width, height)
    
    ctx.fillStyle = defaultTheme.FONT_COLOR
    ctx.font = height * 0.05 + 'px ' + defaultTheme.FONT

    ctx.fillText(gameTitle, 
      (width - ctx.measureText(gameTitle).width) * 0.5,
      height * 0.1)

    drawTextInWidth(ctx, {
      width: width - 40,
      x: 20,
      y: height * 0.2,
      text: gameIntro,
      fontSize: height * 0.03,
      lineHeight: height * 0.03 + 5,
    })

    let startText = 'Click to start!'
    ctx.font = height * 0.03 + 'px ' + defaultTheme.FONT
    ctx.fillText(startText, 
      (width - ctx.measureText(startText).width) * 0.5,
      height * 0.9)
    
    if (showMessage) {
      this.element.style.display = 'block'
    }
    else {
      this.element.style.display = 'none'
    }
  }
}