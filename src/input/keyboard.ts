import { terminal as term } from 'terminal-kit'
import { Controller } from './controller'

export class Keyboard extends Controller {
  constructor() {
    super()

    term.grabInput({ mouse: 'button' })
    term.hideCursor()

    term.on('key', (name: string) => {
      this.keyPressed(name)
    })
  }

  public dispose() {
    term.restoreCursor()
    term.grabInput(false)
  }
}
