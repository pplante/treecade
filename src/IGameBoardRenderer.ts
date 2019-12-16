import { GameBoard } from './gameBoard'

export interface IGameBoardRenderer {
  gameBoard: GameBoard

  render(): void
}
