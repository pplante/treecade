import { GameBoard } from './gameBoard'

export class GameOverScreen extends GameBoard {
  public tick() {
    super.tick()

    let hasFlakes = false
    for (const column of this.columns) {
      column.tick()

      const flakes = column.pixels.filter(v => v === true)
      if (flakes.length > 0) {
        hasFlakes = true
      }
    }

    if (!hasFlakes) {
      this.gameRunning = false
      this.emit('gameOver')
    }
  }
}
