export default (config = {}) => {
  const {
    // Game properties config
    fps,
    // Game init logic
    init,
    // Game state update per frame
    update,
    // Game render per frame
    render
  } = config

  init()

  const gameLoop = {
    /**
     * The animation loop key for cancel animation
     */
    _animationLoopKey: null,
    /**
     * Accumulator for time-based animation
     */
    _accumulator: 0,
    /**
     * Trigger game loop
     */
    _loop: (lastTimestamp) => {
      gameLoop._animationLoopKey = window.requestAnimationFrame(() => {
        const now = Date.now()
        const dt = 1000 / fps
        gameLoop._accumulator += now - lastTimestamp

        if (gameLoop._accumulator >= dt) {
          while (gameLoop._accumulator >= dt) {
            update(dt)
            gameLoop._accumulator -= dt
          }
          render()
        }
        gameLoop._loop(now)
      })
    },
    /**
     * Start the game loop
     */
    start: () => {
      gameLoop._loop(Date.now())
    },
    /**
     * End the game loop
     */
    end: () => {
      window.cancelAnimationFrame(gameLoop.animationLoopKey)
    }
  }

  return gameLoop
}