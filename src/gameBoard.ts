import { Column } from './column'

export class GameBoard {
  get isRunning(): boolean {
    return this.gameRunning
  }

  get playerPosition(): number {
    return this.playerPos
  }

  public readonly columns: Column[]
  private ticks: number
  private playerPos: number
  private gameRunning: boolean

  constructor(public readonly height: number = 40, public readonly width: number = 10) {
    this.columns = []
    this.ticks = 0
    this.playerPos = Math.floor(this.width / 2)
    this.gameRunning = true

    for (let x = 0; x < width; x++) {
      this.columns[x] = new Column(this.height)
    }
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

    if (this.ticks % 50 === 0) {
      this.addFlake()
    }
  }

  public addFlake() {
    const x = Math.floor(Math.random() * this.width)
    this.columns[x].addFlake()
  }

  public moveRight() {
    this.playerPos = Math.min(this.playerPos + 1, this.width)
  }

  public moveLeft() {
    this.playerPos = Math.max(this.playerPos - 1, 0)
  }
}
