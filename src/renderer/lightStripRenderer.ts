import { Column } from '../column'
import { GAME_HEIGHT, GAME_PLAYER_WIDTH, GAME_SKIP_WIDTH, GAME_WIDTH } from '../config'
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

  public static initStrip() {
    if (!LightStripRenderer.config) {
      const leds = (GAME_HEIGHT + GAME_PLAYER_WIDTH + GAME_SKIP_WIDTH) * GAME_WIDTH
      this.config = { brightness: 255, dma: 10, gpio: 18, leds, strip: 'rgb' }

      ws281x.configure(LightStripRenderer.config)
    }
  }

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
          for (let p = i; p < i + GAME_PLAYER_WIDTH; p++) {
            pixels[p] = WHITE
          }
        }
      }

      i += GAME_PLAYER_WIDTH + GAME_SKIP_WIDTH
    })

    ws281x.render(pixels)
  }
}
