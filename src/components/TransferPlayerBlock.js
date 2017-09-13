import Block from './Block'
import {blockType} from '../enums'
import Position from './Position'
import {defaultTheme} from '../theme'

export default class TransferPlayerBlock extends Block {
  constructor (props) {
    super(props)
    this.type = blockType.TRANSFER_PLAYER
    this.fillStyle = defaultTheme.TRANSFER_PLAYER_BLOCK_COLOR
  }
}

