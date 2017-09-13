import Block from './Block'
import {blockType} from '../enums'
import Position from './Position'
import {defaultTheme} from '../theme'

export default class TransferEnemyBlock extends Block {
  constructor (props) {
    super(props)
    this.type = blockType.TRANSFER_ENEMY
    this.fillStyle = defaultTheme.TRANSFER_ENEMY_BLOCK_COLOR
  }
}

