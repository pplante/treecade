import { terminal as term } from 'terminal-kit'
import { GAME_FRAME_INTERVAL, GAME_HEIGHT, GAME_MANUAL_STEP, GAME_WIDTH } from './config'
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
    if (name === 'n' && GAME_MANUAL_STEP) {
      tickGame()
    }

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

  if (!GAME_MANUAL_STEP) {
    tickTimer = setInterval(tickGame, GAME_FRAME_INTERVAL)
  } else {
    tickGame()
  }
}

function startGameOverScreen() {
  const board = GameOverScreen.fromGameBoard(gameBoard)
  board.on('gameOver', startScreenSaver)

  begin(board)
}

function startGame() {
  const board = new FlakeInvaders(GAME_HEIGHT, GAME_WIDTH)
  board.on('gameOver', startGameOverScreen)

  begin(board)
}

function startScreenSaver() {
  begin(new ScreenSaver(GAME_HEIGHT, GAME_WIDTH))
}

LightStripRenderer.initStrip()
startScreenSaver()
