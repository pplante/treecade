import { FlakeInvaders } from '../src/gameBoard/flakeInvaders'
import { GameBoard } from '../src/gameBoard/gameBoard'
import { center, LcdRenderer } from '../src/renderer/lcdRenderer'

jest.mock('../src/util/fakeLcd')

const allOff = '.....'

describe('LcdRenderer', () => {
  let board: GameBoard
  let renderer: LcdRenderer

  const { FakeLcd } = require('../src/util/fakeLcd.ts')

  beforeEach(() => {
    board = FlakeInvaders.fromArray([allOff, allOff, '.*...', allOff, allOff])
    board.gameSpeed = 15
    renderer = new LcdRenderer(board)

    // @ts-ignore
    renderer.render = renderer.originalRender // cancel the throttle
  })

  describe('#render', () => {
    it('should render text', () => {
      renderer.render()

      const firstInstance = FakeLcd.mock.instances[0]
      expect(firstInstance.println).toBeCalledWith('score: 0', 1)
      expect(firstInstance.println).toBeCalledWith('level: 1', 2)
    })
  })
  describe('#center', () => {
    it('should center text', () => {
      expect(center('GAME OVER')).toEqual('     GAME OVER')
    })
  })
})
