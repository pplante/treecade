import { EventEmitter } from 'events'

export abstract class Controller extends EventEmitter {
  public abstract dispose(): void

  protected keyPressed(key: string): void {
    this.emit('button', key)
  }
}
