import Block from './components/Block'
import Enemy from './components/Enemy'
import Player from './components/Player'

import {defaultConfig} from './theme'

const defaultLevelState = {
  width: defaultConfig.width,
  height: defaultConfig.height,
  columns: defaultConfig.columns,
  rows: defaultConfig.rows
}

let levelCache = []

export default {
  createLevel: (level, cleanCache = false) => {
    if (levelCache[level] && !cleanCache) {
      return levelCache[level]
    }

    let levelGameMapState = Object.assign({}, defaultLevelState),
        rows = levelGameMapState.rows,
        columns = levelGameMapState.columns,
        levelEnemyState = Object.assign({}, defaultLevelState, {
          enemies: []
        }),
        playerRow = Math.floor(Math.random() * rows),
        playerColumn = Math.floor(Math.random() * columns),
        levelPlayerState = Object.assign({}, defaultLevelState, {
          player: new Player({
            row: playerRow,
            column: playerColumn
          })
        }),
        blocks = []

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (i === playerRow && j === playerColumn) {
          continue
        }
        
        let randomChance = Math.random()

        if (randomChance < defaultConfig.blockPercentage) {
          // 10% chance of getting a block
          blocks.push(new Block({
            row: i,
            column: j
          }))
        }
        else if (randomChance < defaultConfig.blockPercentage + defaultConfig.enemyPercentage) {
          // 30% chance of getting an enemy
          levelEnemyState.enemies.push(new Enemy({
            row: i,
            column: j,
            isCopycat: Math.random() > 0.5
          }))
        }
      }
    }

    levelCache[level] = {
      levelGameMapState,
      levelEnemyState,
      levelPlayerState,
      blocks
    }

    return levelCache[level]
  }
}