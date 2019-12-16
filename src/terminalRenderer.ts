import { terminal as term } from 'terminal-kit'
import { GameBoard } from './gameBoard'
import { IGameBoardRenderer } from './IGameBoardRenderer'

export class TerminalRenderer implements IGameBoardRenderer {
  constructor(public readonly gameBoard: GameBoard) {}

  public render(): void {
    term.clear()
    term.cyan(`speed: ${this.gameBoard.gameSpeed}, level: ${this.gameBoard.level}, score: ${this.gameBoard.ticks}\n`)

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

    const playerMarker = '#'.padStart(this.gameBoard.playerPosition + 1, '\t')
    term.blue(playerMarker)
    term.nextLine(2)
  }
}
