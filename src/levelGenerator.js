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

    let totalSpots = (defaultConfig.columns - 2) * (defaultConfig.rows - 2),
        // 20% of available spots
        baseNumOfStones = Math.floor(0.2 * totalSpots),
        upperNumOfStones = Math.floor(0.5 * totalSpots),
        // With higher level, more stones
        // Even number
        numOfStones = level * 2 + baseNumOfStones

    numOfStones = Math.min(numOfStones, upperNumOfStones)
    // Make sure it's a even number
    numOfStones = numOfStones % 2 === 1 ? numOfStones + 1 : numOfStones

    let {rows, columns, blockPercentage} = defaultConfig, // Update this to create different config per level
        arrayLocator = [],
        locatorItr = 0,
        playerStoneCount = 0,
        enemyStoneCount = 0,
        transferPlayerBlockCount = 0,
        transferEnemyBlockCount = 0,
        gameMapConfig = {
          blocks: [],
          rows,
          columns
        },
        playerConfig = {
          players: []
        },
        enemyConfig = {
          enemies: []
        }

    while (totalSpots--) {
      let item = playerStoneCount++ < numOfStones / 2 ? new Player() 
            : enemyStoneCount++ < numOfStones / 2 ? new Enemy() 
              : transferPlayerBlockCount++ < defaultConfig.transferPlayerBlockCount ? new TransferPlayerBlock() 
                : transferEnemyBlockCount++ < defaultConfig.transferEnemyBlockCount ? new TransferEnemyBlock()  
                  : null

      arrayLocator.push({
        weight: Math.random(),
        item
      })
    }
    arrayLocator.sort((weightSpot1, weightSpot2) => weightSpot1.weight - weightSpot2.weight)

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

        let item = arrayLocator[(i - 1) * (columns - 2) + (j - 1)].item
        if (item === null) {
          if (Math.random() < 0.1) {
            // 10% chance of getting a block
            gameMapConfig.blocks.push(new Block({
              row: i,
              column: j
            }))
          }
          continue
        }

        if (item instanceof Player) {
          playerConfig.players.push(item)
        }
        else if (item instanceof Enemy) {
          enemyConfig.enemies.push(item)
        }
        else if (item instanceof Block) {
          gameMapConfig.blocks.push(item)
        }

        item.setPosition({
          row: i, 
          column: j
        })

        // if (randomChance < blockPercentage) {
        //   // 10% chance of getting a block
        //   gameMapConfig.blocks.push(new Block({
        //     row: i,
        //     column: j
        //   }))
        // }
        // else if (randomChance < blockPercentage + enemyPercentage) {
        //   // 30% chance of getting an enemy
        //   enemyConfig.enemies.push(new Enemy({
        //     row: i,
        //     column: j
        //   }))
        // }
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