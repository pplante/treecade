import { Column } from '../column'
import { GAME_SPEED_CURVE, INITIAL_GAME_SPEED, LEVEL_UP_FREQUENCY } from '../config'
import { GameBoard } from './gameBoard'

export class FlakeInvaders extends GameBoard {
  private nextLevelUp: number

  get renderPlayer(): boolean {
    return true
  }

  constructor(height: number = 40, width: number = 10, columns: Column[] = null) {
    super(height, width, columns)

    this.gameSpeed = INITIAL_GAME_SPEED
    this.nextLevelUp = LEVEL_UP_FREQUENCY
    this.playerPos = Math.floor(this.width / 2)
  }

  public tick() {
    super.tick()

    this.detectCollision()

    if (this.score >= this.nextLevelUp) {
      this.level += 1
      this.nextLevelUp += LEVEL_UP_FREQUENCY
      this.gameSpeed = Math.max(this.gameSpeed - GAME_SPEED_CURVE, 1.0)
    }

    if (this.ticks % this.gameSpeed === 0) {
      for (let i = 0; i < Math.ceil(this.level / 3); i++) {
        this.addFlake()
      }
    }
  }

  public detectCollision() {
    const playerColumn = this.columns[this.playerPos]
    if (playerColumn.lastPixel) {
      this.gameRunning = false
      this.emit('gameOver')
    }
  }

  public moveRight() {
    this.playerPos = Math.min(this.playerPos + 1, this.width - 1)
  }

  public moveLeft() {
    this.playerPos = Math.max(this.playerPos - 1, 0)
  }
}
