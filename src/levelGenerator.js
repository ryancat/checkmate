const defaultLevelState = {
  width: 800,
  height: 600,
  columns: 8,
  rows: 6, 
  style: {}
}

let levelCache = []

export default {
  createLevel: (level, cleanCache = false) => {
    if (levelCache[level] && !cleanCache) {
      return levelCache[level]
    }

    let gameMapState = Object.assign({}, defaultLevelState)

    levelCache[level] = {
      gameMapState
    }

    return levelCache[level]
  }
}