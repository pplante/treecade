import { GameBoard } from './gameBoard'
import { IGameBoardRenderer } from './IGameBoardRenderer'

let ws281x: any
try {
  // tslint:disable-next-line:no-var-requires
  ws281x = require('rpi-ws281x')
} catch (err) {
  // tslint:disable-next-line:no-var-requires
  ws281x = require('../src/fake281x')
}

interface IWS281xConfig {
  leds: number
  dma: number
  brightness: number
  gpio: number
  strip: 'rgb' | 'grb'
}

const WHITE = packRGB(255, 255, 255)
const PURPLE = packRGB(106, 13, 173)

function packRGB(red: number, green: number, blue: number) {
  // tslint:disable-next-line:no-bitwise
  return (red << 16) | (green << 8) | blue
}

export class LightStripRenderer implements IGameBoardRenderer {
  public config: IWS281xConfig

  constructor(board: GameBoard, private readonly playerWidth: number = 6) {
    const leds = (board.height + this.playerWidth) * board.width
    this.config = { brightness: 255, dma: 10, gpio: 18, leds, strip: 'rgb' }

    ws281x.configure(this.config)
  }

  public render(): void {
    const pixels = new Uint32Array(this.config.leds)

    let i = 0

    board.columns.forEach((column, colIndex) => {
      column.pixels.map(pixel => {
        if (pixel) {
          pixels[i] = PURPLE
        }

        i += 1
      })

      if (colIndex === board.playerPosition) {
        for (let p = i; p < i + this.playerWidth; p++) {
          pixels[p] = WHITE
        }
      } else {
        i += this.playerWidth
      }
    })

    ws281x.render(pixels)
  }
}
