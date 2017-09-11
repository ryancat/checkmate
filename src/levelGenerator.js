import Block from './components/Block'
import Enemy from './components/Enemy'
import Player from './components/Player'

import {defaultConfig} from './theme'

const defaultLevelState = {
  widthPercentage: defaultConfig.widthPercentage,
  heightPercentage: defaultConfig.heightPercentage,
  totalBlocks: defaultConfig.totalBlocks

  // columns: defaultConfig.columns,
  // rows: defaultConfig.rows
}

let levelCache = []

function getLevelState (level) {
  // TODO: depend on level, we need to add varity to level states
  return defaultLevelState
}

export default {
  createLevel: (level, cleanCache = false) => {
    if (levelCache[level] && !cleanCache) {
      return levelCache[level]
    }

    let levelState = getLevelState(level),
        totalBlocks = levelState.totalBlocks,
        playerIndex = Math.floor(Math.random() * totalBlocks),
        levelPlayerState = {
          player: playerIndex
        },
        levelGameMapState = {
          blocks: []
        },
        // rows = levelGameMapState.rows,
        // columns = levelGameMapState.columns,
        levelEnemyState = {
          enemies: []
        }
        // playerRow = Math.floor(Math.random() * rows),
        // playerColumn = Math.floor(Math.random() * columns),
        
    for (let i = 0; i < totalBlocks; i++) {
      if (i === playerIndex) {
        continue
      }

      let randomChance = Math.random()

      if (randomChance < defaultConfig.blockPercentage) {
        // 10% chance of getting a block
        levelGameMapState.blocks.push(i)
      }
      else if (randomChance < defaultConfig.blockPercentage + defaultConfig.enemyPercentage) {
        // 30% chance of getting an enemy
        levelEnemyState.enemies.push(i)
      }
    }

    // for (let i = 0; i < rows; i++) {
    //   for (let j = 0; j < columns; j++) {
    //     if (i === playerRow && j === playerColumn) {
    //       continue
    //     }

    //     let randomChance = Math.random()

        
    //   }
    // }

    levelCache[level] = {
      levelState,
      levelGameMapState,
      levelEnemyState,
      levelPlayerState
    }

    return levelCache[level]
  }
}