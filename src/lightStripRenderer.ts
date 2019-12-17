import { Column } from './column'
import { GameBoard } from './gameBoard'
import { GameBoardRenderer } from './GameBoardRenderer'

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

export class LightStripRenderer extends GameBoardRenderer {
  public config: IWS281xConfig

  constructor(gameBoard: GameBoard, private readonly playerWidth: number = 6) {
    super(gameBoard)

    const leds = (gameBoard.height + this.playerWidth) * gameBoard.width
    this.config = { brightness: 255, dma: 10, gpio: 18, leds, strip: 'rgb' }

    ws281x.configure(this.config)
  }

  public render(): void {
    const pixels = new Uint32Array(this.config.leds)

    let i = 0

    this.gameBoard.columns.forEach((column: Column, colIndex: number) => {
      column.pixels.map(pixel => {
        if (pixel) {
          pixels[i] = PURPLE
        }

        i += 1
      })

      if (this.gameBoard.renderPlayer) {
        if (colIndex === this.gameBoard.playerPosition) {
          for (let p = i; p < i + this.playerWidth; p++) {
            pixels[p] = WHITE
          }
        }
      }

      i += this.playerWidth
    })

    ws281x.render(pixels)
  }
}
