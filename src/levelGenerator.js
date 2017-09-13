import Block from './components/Block'
import TransferEnemyBlock from './components/TransferEnemyBlock'
import TransferPlayerBlock from './components/TransferPlayerBlock'
import Enemy from './components/Enemy'
import Player from './components/Player'

import {defaultConfig} from './theme'

let levelCache = []

export default {
  createLevel: (level, cleanCache = false) => {
    if (levelCache[level] && !cleanCache) {
      return levelCache[level]
    }

    let {rows, columns, blockPercentage, enemyPercentage} = defaultConfig, // Update this to create different config per level
        playerRow = Math.floor(1 + Math.random() * (rows - 2)),
        playerColumn = Math.floor(1 + Math.random() * (columns - 2)),
        playerConfig = {
          player: new Player({
            row: playerRow,
            column: playerColumn,
            rows,
            columns
          }),
          rows,
          columns
        },
        gameMapConfig = {
          blocks: [],
          rows,
          columns
        },
        enemyConfig = {
          enemies: [],
          rows,
          columns
        }

    // Generate transfer block
    let transferBlockRow,
        transferBlockColumn

    do {
      transferBlockRow = Math.floor(1 + Math.random() * (rows - 2))
      transferBlockColumn = Math.floor(1 + Math.random() * (columns - 2))
    } while (transferBlockRow === playerRow 
      && transferBlockColumn === playerColumn)

    gameMapConfig.blocks.push(new TransferPlayerBlock({
      row: transferBlockRow,
      column: transferBlockColumn,
      rows,
      columns
    }))

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        // Generate wall blocks
        if (i === 0 || j === 0 || i === rows - 1 || j === columns - 1) {
          gameMapConfig.blocks.push(new Block({
            row: i,
            column: j,
            rows,
            columns
          }))
          continue
        }

        if ((i === playerRow && j === playerColumn)
          || (i === transferBlockRow && j === transferBlockColumn)) {
          continue
        }
        
        let randomChance = Math.random()

        if (randomChance < blockPercentage) {
          // 10% chance of getting a block
          gameMapConfig.blocks.push(new Block({
            row: i,
            column: j,
            rows,
            columns
          }))
        }
        else if (randomChance < blockPercentage + enemyPercentage) {
          // 30% chance of getting an enemy
          enemyConfig.enemies.push(new Enemy({
            row: i,
            column: j,
            rows,
            columns
          }))
        }
      }
    }

    levelCache[level] = {
      gameMapConfig,
      enemyConfig,
      playerConfig
    }

    return levelCache[level]
  }
}