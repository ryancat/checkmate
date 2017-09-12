import Block from './components/Block'
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
        playerRow = Math.floor(Math.random() * rows),
        playerColumn = Math.floor(Math.random() * columns),
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

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (i === playerRow && j === playerColumn) {
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
            columns,
            isCopycat: Math.random() > 0.5
          }))
        }
      }
    }

    console.log(levelCache)

    levelCache[level] = {
      gameMapConfig,
      enemyConfig,
      playerConfig
    }

    return levelCache[level]
  }
}