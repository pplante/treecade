import { Column } from './column'

const LEVEL_TICK_FREQUENCY = 50

export class GameBoard {
  get isRunning(): boolean {
    return this.gameRunning
  }

  get playerPosition(): number {
    return this.playerPos
  }

  public static fromArray(columnString: string[]): GameBoard {
    const width = columnString.length
    const height = columnString[0].length
    const columns = columnString.map(val => Column.fromString(val))

    return new GameBoard(height, width, columns)
  }

  public readonly columns: Column[]
  public level: number
  public ticks: number
  public gameSpeed: number
  private playerPos: number
  private gameRunning: boolean

  constructor(public readonly height: number = 40, public readonly width: number = 10, columns: Column[] = null) {
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
    this.gameSpeed = 5
    this.playerPos = Math.floor(this.width / 2)

    this.gameRunning = true
  }

  public toString() {
    return this.columns.map(p => p.toString())
  }

  public tick() {
    if (!this.isRunning) {
      return
    }

    for (const column of this.columns) {
      column.tick()
    }

    const playerColumn = this.columns[this.playerPos]
    if (playerColumn.lastPixel) {
      this.gameRunning = false
      return
    }

    this.ticks += 1
    if (this.ticks % LEVEL_TICK_FREQUENCY === 0) {
      this.level += 1
      this.gameSpeed = Math.max(this.gameSpeed - 0.5, 1.0)
    }

    if (this.ticks % this.gameSpeed === 0) {
      this.addFlake()
    }
  }

  public addFlake() {
    const x = Math.floor(Math.random() * this.width)
    this.columns[x].addFlake()
  }

  public moveRight() {
    this.playerPos = Math.min(this.playerPos + 1, this.width - 1)
  }

  public moveLeft() {
    this.playerPos = Math.max(this.playerPos - 1, 0)
  }
}
