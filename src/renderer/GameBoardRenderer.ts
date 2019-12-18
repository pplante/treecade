import { GameBoard } from '../gameBoard/gameBoard'

export abstract class GameBoardRenderer {
  constructor(protected readonly gameBoard: GameBoard) {}

  public abstract render(): void
}
