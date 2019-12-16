import { Column } from './column'
import { GameBoard } from './gameBoard'

const LEVEL_TICK_FREQUENCY = 50

export class FlakeInvaders extends GameBoard {
  get renderPlayer(): boolean {
    return true
  }

  constructor(height: number = 40, width: number = 10, columns: Column[] = null) {
    super(height, width, columns)

    this.gameSpeed = 5
    this.playerPos = Math.floor(this.width / 2)
  }

  public tick() {
    super.tick()

    const playerColumn = this.columns[this.playerPos]
    if (playerColumn.lastPixel) {
      this.gameRunning = false
      this.emit('gameOver')
      return
    }

    if (this.ticks % LEVEL_TICK_FREQUENCY === 0) {
      this.level += 1
      this.gameSpeed = Math.max(this.gameSpeed - 0.5, 1.0)
    }

    if (this.ticks % this.gameSpeed === 0) {
      this.addFlake()
    }
  }

  public moveRight() {
    this.playerPos = Math.min(this.playerPos + 1, this.width - 1)
  }

  public moveLeft() {
    this.playerPos = Math.max(this.playerPos - 1, 0)
  }
}
