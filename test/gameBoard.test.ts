import { GameBoard } from '../src/gameBoard'

const allOff = '.....'

describe('GameBoard', () => {
  let board: GameBoard

  beforeEach(() => {
    board = new GameBoard(5, 5)
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

      expect(board.toString()).toEqual([allOff, allOff, '.*...', allOff, allOff])

      board.tick()

      expect(board.toString()).toEqual([allOff, allOff, '..*..', allOff, allOff])
    })

    // noinspection DuplicatedCode
    it('should add a new flake depending on game speed', () => {
      expect(board.toString()).toEqual([allOff, allOff, allOff, allOff, allOff])

      for (let i = 0; i < 50; i++) {
        board.tick()
      }

      expect(board.toString()).toEqual([allOff, allOff, '....*', allOff, allOff])

      mockMath.random = () => 0.7
      board.addFlake()

      expect(board.toString()).toEqual([allOff, allOff, '....*', '*....', allOff])
    })

    it('should detect player collisions', () => {
      mockMath.random = () => 0.5
      board.addFlake() // adds to column 3
      expect(board.playerPosition).toBe(2)
      expect(board.isRunning).toBe(true)
      for (let i = 0; i < 3; i++) {
        board.tick()
        expect(board.isRunning).toBe(true)
      }
      board.tick()
      expect(board.isRunning).toBe(false)
      expect(board.toString()).toEqual([allOff, allOff, '....*', allOff, allOff])
    })
  })

  describe('#playerMove', () => {
    it('should move left or right', () => {
      expect(board.playerPosition).toBe(2)
      board.moveRight()
      board.moveRight()
      board.moveRight()
      board.moveRight()
      board.moveRight()
      expect(board.playerPosition).toBe(4)

      board.moveLeft()
      expect(board.playerPosition).toBe(3)
      board.moveLeft()
      board.moveLeft()
      board.moveLeft()
      board.moveLeft()
      board.moveLeft()
      expect(board.playerPosition).toBe(0)
    })
  })
})
