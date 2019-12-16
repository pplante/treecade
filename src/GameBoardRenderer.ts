import { GameBoard } from './gameBoard'

export abstract class GameBoardRenderer {
  constructor(protected readonly gameBoard: GameBoard) {}

  public abstract render(): void
}
