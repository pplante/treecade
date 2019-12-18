import { throttle } from 'throttle-debounce'
import { FlakeInvaders } from '../gameBoard/flakeInvaders'
import { GameBoard } from '../gameBoard/gameBoard'
import { GameOverScreen } from '../gameBoard/gameOverScreen'
import { ScreenSaver } from '../gameBoard/screenSaver'
import { FakeLcd } from '../util/fakeLcd'

import { GameBoardRenderer } from './GameBoardRenderer'

let LCD: any
try {
  // tslint:disable-next-line:no-var-requires
  LCD = require('lcdi2c')
} catch (err) {
  LCD = FakeLcd
}

const EMPTY_LINE = ''.padStart(20, ' ')

export class LcdRenderer extends GameBoardRenderer {
  // @ts-ignore
  private lcd: LCD
  private lines: string[]

  constructor(gameBoard: GameBoard) {
    super(gameBoard)

    this.lcd = new LCD(1, 0x3f, 20, 4)
    this.lcd.clear()
    this.lines = []
    // @ts-ignore
    this.originalRender = this.render
    this.render = throttle(100, this.render)
  }

  public render = (): void => {
    if (this.gameBoard instanceof FlakeInvaders) {
      this.println(`score: ${this.gameBoard.score}`, 1)
      this.println(`level: ${this.gameBoard.level}`, 2)
      this.println(EMPTY_LINE, 3)
      this.println(EMPTY_LINE, 4)
    } else if (this.gameBoard instanceof GameOverScreen) {
      this.println(center('GAME OVER'), 1)
      this.println(EMPTY_LINE, 1)
      this.println(center('BETTER LUCK'), 3)
      this.println(center('NEXT TIME'), 4)
    } else if (this.gameBoard instanceof ScreenSaver) {
      this.println(EMPTY_LINE, 1)
      this.println(center('PRESS START'), 2)
      this.println(center('TO PLAY'), 3)
      this.println(EMPTY_LINE, 4)
    }
  }

  private println(value: string, lineNum: number) {
    if (this.lines[lineNum] !== value) {
      this.lcd.println(value, lineNum)
      this.lines[lineNum] = value
    }
  }
}

export function center(str: string) {
  const length = str.length
  const maxLength = 20
  if (length < maxLength) {
    str = str.padStart(Math.floor((maxLength - length) / 2) + length, ' ')
  }

  return str
}
