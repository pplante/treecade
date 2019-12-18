import { GameBoard } from '../src/gameBoard/gameBoard'

const allOff = '.....'

describe('GameBoard', () => {
  let board: GameBoard

  beforeEach(() => {
    board = new GameBoard(5, 5)
    board.gameSpeed = 15
  })

  const mockMath = Object.create(global.Math)
  mockMath.random = () => 0.5
  global.Math = mockMath

  it('toString should return a representation of the game board', () => {
    expect(board.toString()).toEqual([allOff, allOff, allOff, allOff, allOff])
  })

  describe('#tick', () => {
    it('should advance snow flakes', () => {
      board.tick()

      expect(board.toString()).toEqual([allOff, allOff, '.....', allOff, allOff])

      board.addFlake()
      expect(board.toString()).toEqual([allOff, allOff, '*....', allOff, allOff])

      board.tick()

      expect(board.toString()).toEqual([allOff, allOff, '*....', allOff, allOff])

      board.tick()

      expect(board.toString()).toEqual([allOff, allOff, '*....', allOff, allOff])
    })
  })
})
