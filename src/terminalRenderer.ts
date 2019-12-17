import { terminal as term } from 'terminal-kit'
import { GameBoardRenderer } from './GameBoardRenderer'

export class TerminalRenderer extends GameBoardRenderer {
  public render(): void {
    term.clear()
    term.cyan(
      `mode: ${this.gameBoard.constructor.name}, speed: ${this.gameBoard.gameSpeed}, level: ${this.gameBoard.level}, score: ${this.gameBoard.score}\n`,
    )

    for (let y = 0; y < this.gameBoard.height; y++) {
      for (let x = 0; x < this.gameBoard.width; x++) {
        const pixel = this.gameBoard.columns[x].pixels[y]
        if (pixel) {
          term.white('*\t')
        } else {
          term.green('.\t')
        }
      }

      term.nextLine(1)
    }

    if (this.gameBoard.renderPlayer) {
      const playerMarker = '#'.padStart(this.gameBoard.playerPosition + 1, '\t')
      term.blue(playerMarker)
      term.nextLine(2)
    }
  }
}
