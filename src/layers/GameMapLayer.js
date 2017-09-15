import BaseLayer from './BaseLayer'
import {defaultTheme} from '../theme'
import Block from '../components/Block'

import store from '../store'
import {action} from '../action'
import {stateKey, layerType} from '../enums'

export default class GameMapLayer extends BaseLayer {
  constructor (container) {
    super(container)
    this.type = layerType.GAME_MAP
    this.stateKey = stateKey.GAME_MAP
  }

  update () {
    let newState = store.getState(this.stateKey)
    // Do nothing if the state is dirty
    if (!newState.dirty) {
      return
    }

    let {columns, rows, blocks} = newState,
        width = this.container.offsetWidth,
        height = this.container.offsetHeight * 0.9,
        widthPerBlock = width / columns,
        heightPerBlock = height / rows,
        xLines = [],
        yLines = [],
        blockRenderStates

    for (let i = 0; i <= columns; i++) {
      yLines.push({
        x: i * widthPerBlock,
        y0: 0,
        y1: height
      })
    }

    for (let j = 0; j <= rows; j++) {
      xLines.push({
        y: j * heightPerBlock,
        x0: 0,
        x1: width
      })
    }

    blockRenderStates = blocks.map((block) => {
      return {
        x: block.position.column * widthPerBlock + 1,
        y: block.position.row * heightPerBlock + 1,
        width: widthPerBlock - 2,
        height: heightPerBlock - 2,
        fillStyle: block.fillStyle,
        block
      }
    })

    this.finalRenderState = {
      xLines, 
      yLines,
      blockRenderStates
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

    let width = this.container.offsetWidth
    let height = this.container.offsetHeight
    let {xLines, yLines, blockRenderStates} = this.renderState

    this.element.width = width
    this.element.height = height
    this.context.fillStyle = defaultTheme.BACKGROUND_COLOR
    this.context.fillRect(0, 0, width, height * 0.9)

    blockRenderStates.forEach((blockRenderState) => {
      this.context.fillStyle = blockRenderState.fillStyle
      this.context.fillRect(blockRenderState.x, blockRenderState.y, blockRenderState.width, blockRenderState.height)
    })

    this.context.strokeStyle = defaultTheme.EDGE_COLOR
    this.context.lineWidth = defaultTheme.EDGE_LINE_WIDTH
    this.context.beginPath()

    xLines.forEach((xLine) => {
      this.context.moveTo(xLine.x0, xLine.y)
      this.context.lineTo(xLine.x1, xLine.y)
      this.context.stroke()
    })

    yLines.forEach((yLine) => {
      this.context.moveTo(yLine.x, yLine.y0)
      this.context.lineTo(yLine.x, yLine.y1)
      this.context.stroke()
    })
  }
}