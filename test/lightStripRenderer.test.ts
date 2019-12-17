jest.mock('../src/fake281x')

import { GameBoard } from '../src/gameBoard'
import { LightStripRenderer } from '../src/lightStripRenderer'

const allOff = '.....'

describe('LightStripRenderer', () => {
  let board: GameBoard
  let renderer: LightStripRenderer

  const ws281x = require('../src/fake281x')

  beforeEach(() => {
    board = GameBoard.fromArray([allOff, allOff, '.*...', allOff, allOff])
    board.gameSpeed = 15
    renderer = new LightStripRenderer(board, 2)
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
