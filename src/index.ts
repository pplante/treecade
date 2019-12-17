import { terminal as term } from 'terminal-kit'
import { Column } from './column'
import { FlakeInvaders } from './flakeInvaders'
import { GameBoard } from './gameBoard'
import { GameBoardRenderer } from './GameBoardRenderer'
import { GameOverScreen } from './gameOverScreen'
import { LightStripRenderer } from './lightStripRenderer'
import { ScreenSaver } from './screenSaver'
import { TerminalRenderer } from './terminalRenderer'

let gameBoard: GameBoard
let renderers: GameBoardRenderer[] = []
let tickTimer: NodeJS.Timeout
export const GAME_HEIGHT = 10
export const GAME_WIDTH = 9
export const LEVEL_UP_FREQUENCY = 10
export const GAME_SPEED_CURVE = 2.5
export const GAME_FRAME_INTERVAL = 15
export const INITIAL_GAME_SPEED = 30

function terminate() {
  term.restoreCursor()
  term.grabInput(false)
  setTimeout(() => {
    process.exit()
  }, 100)
}

term.bold.cyan('Type anything on the keyboard...\n')
term.green('Hit CTRL-C to quit.\n\n')

term.grabInput({ mouse: 'button' })
term.hideCursor()

term.on('key', (name: string) => {
  if (name === 'CTRL_C') {
    terminate()
  } else if (name === 's') {
    if (gameBoard instanceof FlakeInvaders && gameBoard.isRunning) {
      return
    }

    startGame()
  }

  if (gameBoard && gameBoard.isRunning) {
    if (name === 'LEFT') {
      gameBoard.moveLeft()
    } else if (name === 'RIGHT') {
      gameBoard.moveRight()
    }

    renderGame()
  }
})

function renderGame() {
  renderers.map(r => r.render())
}

function tickGame() {
  if (gameBoard.isRunning) {
    gameBoard.tick()

    renderGame()
  } else {
    clearInterval(tickTimer)
    term.brightRed('game over!\n\n')
  }
}

function begin(board: GameBoard) {
  clearInterval(tickTimer)

  gameBoard = board
  renderers = [new TerminalRenderer(gameBoard), new LightStripRenderer(gameBoard)]

  tickTimer = setInterval(tickGame, GAME_FRAME_INTERVAL)
}

function startGameOverScreen(columns: Column[]) {
  const board = GameOverScreen.fromGameBoard(gameBoard)
  board.on('gameOver', () => {
    startScreenSaver()
  })

  begin(board)
}

function startGame() {
  const board = new FlakeInvaders(GAME_HEIGHT, GAME_WIDTH)
  board.on('gameOver', () => {
    startGameOverScreen(board.columns)
  })

  begin(board)
}

function startScreenSaver() {
  begin(new ScreenSaver(GAME_HEIGHT, GAME_WIDTH))
}

startScreenSaver()
