import { Column } from '../column'
import { GameBoard } from './gameBoard'

enum ScreenState {
  wipingClean,
  swipeUp,
  swipeDown,
}

export class GameOverScreen extends GameBoard {
  private screenState: ScreenState

  constructor(height: number = 40, width: number = 10, columns: Column[] = null) {
    super(height, width, columns)

    this.gameSpeed = 5
    this.screenState = ScreenState.wipingClean
  }

  public tick() {
    super.tick()

    if (this.screenState === ScreenState.wipingClean) {
      if (!this.hasFlakes) {
        this.screenState = ScreenState.swipeUp

        for (const column of this.columns) {
          column.direction = -1
          column.setAll(false)
          column.pixels[column.height - 1] = true
        }
      }
    } else if (this.screenState === ScreenState.swipeUp) {
      if (!this.hasFlakes) {
        this.screenState = ScreenState.swipeDown

        for (const column of this.columns) {
          column.direction = 1
          column.setAll(false)
          column.pixels[0] = true
        }
      }
    } else if (this.screenState === ScreenState.swipeDown) {
      if (!this.hasFlakes) {
        this.gameRunning = false
        this.emit('gameOver')
      }
    }
  }

  private get hasFlakes(): boolean {
    let hasFlakes = false
    for (const column of this.columns) {
      const flakes = column.pixels.filter(v => v === true)
      if (flakes.length > 0) {
        hasFlakes = true
      }
    }
    return hasFlakes
  }
}
