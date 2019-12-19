import { Column } from '../column'
import { getRandomColor } from '../util/colors'
import { GameBoard } from './gameBoard'

enum ScreenState {
  wipingClean,
  swipeUp,
  swipeDown,
}

export class GameOverScreen extends GameBoard {
  private screenState: ScreenState

  constructor(height: number, width: number, columns: Column[] = null) {
    super(height, width, columns)

    this.gameSpeed = 5
    this.keepScore = false
    this.screenState = ScreenState.wipingClean
  }

  public tick() {
    super.tick()

    if (this.screenState === ScreenState.wipingClean) {
      if (!this.hasFlakes) {
        this.screenState = ScreenState.swipeUp

        for (const column of this.columns) {
          column.direction = -1
          column.setAll(null)
          column.pixels[column.height - 1] = getRandomColor()
        }
      }
    } else if (this.screenState === ScreenState.swipeUp) {
      if (!this.hasFlakes) {
        this.screenState = ScreenState.swipeDown

        for (const column of this.columns) {
          column.direction = 1
          column.setAll(null)
          column.pixels[0] = getRandomColor()
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
      const flakes = column.pixels.filter(v => v !== null)
      if (flakes.length > 0) {
        hasFlakes = true
      }
    }
    return hasFlakes
  }
}
