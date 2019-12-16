import { GameBoard } from './gameBoard'

export class ScreenSaver extends GameBoard {
  public tick() {
    super.tick()

    if (this.ticks % this.gameSpeed === 0) {
      this.addFlake()
    }
  }
}
