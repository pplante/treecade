jest.mock('../src/fake281x')

import { SnowflakeAvoider } from 'snowflakeAvoider.ts'
import { LightStripRenderer } from '../src/lightStripRenderer'

const allOff = '.....'

describe('LightStripRenderer', () => {
  let board: SnowflakeAvoider
  let renderer: LightStripRenderer

  const ws281x = require('../src/fake281x')

  beforeEach(() => {
    board = SnowflakeAvoider.fromArray([allOff, allOff, '.*...', allOff, allOff])
    renderer = new LightStripRenderer(board, 2)
  })

  describe('#render', () => {
    it('should make a color array', () => {
      renderer.render()

      // prettier-ignore
      expect(ws281x.render).toBeCalledWith(new Uint32Array([
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 6950317, 0, 0, 0, 16777215, 16777215,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ]))

      board.tick()
      renderer.render()
      // prettier-ignore
      expect(ws281x.render).toBeCalledWith(new Uint32Array([
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 6950317, 0, 0, 16777215, 16777215,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ]))
    })
  })
})
