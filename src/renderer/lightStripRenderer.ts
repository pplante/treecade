import { Column } from '../column'
import { GameBoard } from '../gameBoard/gameBoard'
import { GameBoardRenderer } from './GameBoardRenderer'

let ws281x: any
try {
  // tslint:disable-next-line:no-var-requires
  ws281x = require('rpi-ws281x-v2')
} catch (err) {
  // tslint:disable-next-line:no-var-requires
  ws281x = require('../util/fake281x')
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
  public static config: IWS281xConfig

  public static initStrip(gameHeight: number, gameWidth: number, playerWidth: number, skipWidth: number) {
    if (!LightStripRenderer.config) {
      const leds = (gameHeight + playerWidth + skipWidth) * gameWidth
      LightStripRenderer.config = { brightness: 255, dma: 10, gpio: 18, leds, strip: 'rgb' }
      this.playerSize = playerWidth
      this.skipWidth = skipWidth

      ws281x.configure(LightStripRenderer.config)
    }
  }

  private static skipWidth: number
  private static playerSize: number

  constructor(gameBoard: GameBoard) {
    super(gameBoard)
  }

  public render(): void {
    const pixels = new Uint32Array(LightStripRenderer.config.leds)

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
          for (let p = i; p < i + LightStripRenderer.playerSize; p++) {
            pixels[p] = WHITE
          }
        }
      }

      i += LightStripRenderer.playerSize + LightStripRenderer.skipWidth
    })

    ws281x.render(pixels)
  }
}
