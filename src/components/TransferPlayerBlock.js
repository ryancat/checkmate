import Block from './Block'
import {blockType} from '../enums'
import Position from './Position'
import {defaultTheme} from '../theme'

export default class TransferBlock extends Block {
  constructor (props) {
    super(props)
    this.type = blockType.TRANSFER
    this.fillStyle = defaultTheme.TRANSFER_PLAYER_BLOCK_COLOR
  }
}

