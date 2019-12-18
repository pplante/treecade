import { GAME_FRAME_INTERVAL, GAME_HEIGHT, GAME_MANUAL_STEP, GAME_WIDTH, LED_SKIP_WIDTH, PLAYER_SIZE } from './config'
import { FlakeInvaders } from './gameBoard/flakeInvaders'
import { GameBoard } from './gameBoard/gameBoard'
import { GameOverScreen } from './gameBoard/gameOverScreen'
import { ScreenSaver } from './gameBoard/screenSaver'
import { Joystick } from './input/joystick'
import { Keyboard } from './input/keyboard'
import { GameBoardRenderer } from './renderer/GameBoardRenderer'
import { LcdRenderer } from './renderer/lcdRenderer'
import { LightStripRenderer } from './renderer/lightStripRenderer'
import { TerminalRenderer } from './renderer/terminalRenderer'

let gameBoard: GameBoard
let renderers: GameBoardRenderer[] = []
let tickTimer: NodeJS.Timeout
const keyboardInput = new Keyboard()
let joystickInput: Joystick

keyboardInput.on('button', inputHandler)
if (Joystick.supportedDevices().length > 0) {
  joystickInput = new Joystick()
  joystickInput.on('button', inputHandler)
}

function terminate() {
  keyboardInput.dispose()

  if (joystickInput) {
    joystickInput.dispose()
  }

  setTimeout(() => {
    process.exit()
  }, 100)
}

function inputHandler(key: string) {
  if (key === 'CTRL_C') {
    terminate()
  } else if (key === 's' || key === 'K1') {
    if (gameBoard instanceof FlakeInvaders && gameBoard.isRunning) {
      return
    }

    startGame()
  }

  if (gameBoard && gameBoard.isRunning) {
    if (key === 'n' && GAME_MANUAL_STEP) {
      tickGame()
    }

    if (key === 'LEFT') {
      gameBoard.moveLeft()
    } else if (key === 'RIGHT') {
      gameBoard.moveRight()
    }

    renderGame()
  }
}

function renderGame() {
  renderers.map(r => r.render())
}

function tickGame() {
  if (gameBoard.isRunning) {
    gameBoard.tick()

    renderGame()
  } else {
    clearInterval(tickTimer)
  }
}

function begin(board: GameBoard) {
  clearInterval(tickTimer)

  gameBoard = board
  renderers = [new TerminalRenderer(gameBoard), new LcdRenderer(gameBoard), new LightStripRenderer(gameBoard)]

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

LightStripRenderer.initStrip(GAME_HEIGHT, GAME_WIDTH, PLAYER_SIZE, LED_SKIP_WIDTH)
startScreenSaver()
