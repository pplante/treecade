import { FlakeInvaders } from '../src/gameBoard/flakeInvaders'

const allOff = '.....'

describe('FlakeInvaders', () => {
  let board: FlakeInvaders

  beforeEach(() => {
    board = new FlakeInvaders(5, 5)
    board.gameSpeed = 15
  })

  const mockMath = Object.create(global.Math)
  mockMath.random = () => 0.5
  global.Math = mockMath

  describe('#tick', () => {
    it('should add a new flake depending on game speed', () => {
      expect(board.toString()).toEqual([allOff, allOff, allOff, allOff, allOff])
      expect(board.isRunning).toBe(true)
      for (let i = 0; i < board.gameSpeed; i++) {
        expect(board.tick()).not.toBe(false)
      }

      expect(board.toString()).toEqual([allOff, allOff, '*....', allOff, allOff])

      mockMath.random = () => 0.7
      board.addFlake()

      expect(board.toString()).toEqual([allOff, allOff, '*....', '*....', allOff])
    })

    it('should detect player collisions', () => {
      mockMath.random = () => 0.5
      board.tick()
      expect(board.playerPosition).toBe(2)
      expect(board.isRunning).toBe(true)

      board.columns[2].pixels[board.height - 1] = true
      board.detectCollision()
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
