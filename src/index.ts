import { terminal as term } from 'terminal-kit'
import { GameBoard } from './gameBoard'
import { IGameBoardRenderer } from './IGameBoardRenderer'
import { TerminalRenderer } from './terminalRenderer'

let gameBoard: GameBoard
let renderer: IGameBoardRenderer
let tickTimer: NodeJS.Timeout

function terminate() {
  term.grabInput(false)
  setTimeout(() => {
    process.exit()
  }, 100)
}

term.bold.cyan('Type anything on the keyboard...\n')
term.green('Hit CTRL-C to quit.\n\n')

term.grabInput({ mouse: 'button' })

term.on('key', (name: string) => {
  if (name === 'CTRL_C') {
    terminate()
  } else if (name === 's') {
    startGame()
  }

  if (gameBoard && gameBoard.isRunning) {
    if (name === 'LEFT') {
      gameBoard.moveLeft()
    } else if (name === 'RIGHT') {
      gameBoard.moveRight()
    }

    renderer.render()
  }
})

function tickGame() {
  if (gameBoard.isRunning) {
    gameBoard.tick()
    renderer.render()
  } else {
    clearInterval(tickTimer)
    term.brightRed('game over!\n\n')
  }
}

function startGame() {
  clearInterval(tickTimer)

  gameBoard = new GameBoard(10, 9)
  renderer = new TerminalRenderer(gameBoard)
  tickTimer = setInterval(tickGame, 100)
}

startGame()
