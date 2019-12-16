import { EventEmitter } from 'events'
import { Column } from './column'
import { FlakeInvaders } from './flakeInvaders'

export class GameBoard extends EventEmitter {
  get renderPlayer(): boolean {
    return false
  }

  get playerPosition(): number {
    return this.playerPos
  }

  get isRunning(): boolean {
    return this.gameRunning
  }

  public static fromArray(columnString: string[]): FlakeInvaders {
    const width = columnString.length
    const height = columnString[0].length
    const columns = columnString.map(val => Column.fromString(val))

    return new FlakeInvaders(height, width, columns)
  }

  public readonly columns: Column[]
  public ticks: number
  public level: number
  public gameSpeed: number
  protected gameRunning: boolean
  protected playerPos: number

  constructor(public readonly height: number = 40, public readonly width: number = 10, columns: Column[] = null) {
    super()

    if (columns) {
      this.columns = columns
    } else {
      this.columns = []

      for (let x = 0; x < width; x++) {
        this.columns[x] = new Column(this.height)
      }
    }

    this.ticks = 0
    this.level = 1
    this.gameSpeed = 3
    this.gameRunning = true
  }

  public toString() {
    return this.columns.map(p => p.toString())
  }

  public addFlake() {
    const x = Math.floor(Math.random() * this.width)
    this.columns[x].addFlake()
  }

  public moveRight() {
    // Empty
  }

  public moveLeft() {
    // Empty
  }

  public tick() {
    if (!this.isRunning) {
      return
    }

    this.ticks += 1

    for (const column of this.columns) {
      column.tick()
    }
  }
}
