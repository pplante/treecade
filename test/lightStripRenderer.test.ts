import { GameBoard } from '../src/gameBoard/gameBoard'
import { LightStripRenderer } from '../src/renderer/lightStripRenderer'

jest.mock('../src/util/fake281x')

const allOff = '.....'

describe('LightStripRenderer', () => {
  let board: GameBoard
  let renderer: LightStripRenderer

  const ws281x = require('../src/util/fake281x')

  beforeEach(() => {
    board = GameBoard.fromArray([allOff, allOff, '.*...', allOff, allOff])
    board.gameSpeed = 15
    LightStripRenderer.initStrip(5, 5, 1, 1)
    renderer = new LightStripRenderer(board)
  })

  describe('#render', () => {
    it('should make a color array', () => {
      renderer.render()

      // prettier-ignore
      expect(ws281x.render).toBeCalledWith(new Uint32Array([
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 6950317, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ]))
    })
  })
})
