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
          players: [new Player({
            row: playerRow,
            column: playerColumn
          })]
        },
        gameMapConfig = {
          blocks: [],
          rows,
          columns
        },
        enemyConfig = {
          enemies: []
        }

    // Generate transfer player block
    let transferPlayerBlockRow,
        transferPlayerBlockColumn

    do {
      transferPlayerBlockRow = Math.floor(1 + Math.random() * (rows - 2))
      transferPlayerBlockColumn = Math.floor(1 + Math.random() * (columns - 2))
    } while (transferPlayerBlockRow === playerRow 
      && transferPlayerBlockColumn === playerColumn)

    gameMapConfig.blocks.push(new TransferPlayerBlock({
      row: transferPlayerBlockRow,
      column: transferPlayerBlockColumn
    }))

    // Generate transfer enemy block
    let transferEnemyBlockRow,
        transferEnemyBlockColumn

    do {
      transferEnemyBlockRow = Math.floor(1 + Math.random() * (rows - 2))
      transferEnemyBlockColumn = Math.floor(1 + Math.random() * (columns - 2))
    } while ((transferEnemyBlockRow === playerRow 
        && transferEnemyBlockColumn === playerColumn)
      || (transferEnemyBlockRow === transferPlayerBlockRow 
        && transferEnemyBlockColumn === transferPlayerBlockColumn
      ))

    gameMapConfig.blocks.push(new TransferEnemyBlock({
      row: transferEnemyBlockRow,
      column: transferEnemyBlockColumn
    }))

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        // Generate wall blocks
        if (i === 0 || j === 0 || i === rows - 1 || j === columns - 1) {
          gameMapConfig.blocks.push(new Block({
            row: i,
            column: j
          }))
          continue
        }

        if ((i === playerRow && j === playerColumn)
          || (i === transferPlayerBlockRow && j === transferPlayerBlockColumn)
          || (i === transferEnemyBlockRow && j === transferEnemyBlockColumn)) {
          continue
        }
        
        let randomChance = Math.random()

        if (randomChance < blockPercentage) {
          // 10% chance of getting a block
          gameMapConfig.blocks.push(new Block({
            row: i,
            column: j
          }))
        }
        else if (randomChance < blockPercentage + enemyPercentage) {
          // 30% chance of getting an enemy
          enemyConfig.enemies.push(new Enemy({
            row: i,
            column: j
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