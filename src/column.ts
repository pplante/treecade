export class Column {
  get lastPixel(): boolean {
    return this.pixels[this.pixels.length - 1]
  }

  public static fromString(val: string) {
    const column = new Column(val.length)
    column.pixels = val.split('').map(v => v === '*')
    return column
  }

  public pixels: boolean[]

  constructor(public readonly height: number) {
    this.pixels = []

    for (let y = 0; y < height; y++) {
      this.pixels[y] = false
    }
  }

  public toString(): string {
    return this.pixels.map(v => (v === true ? '*' : '.')).join('')
  }

  public addFlake() {
    this.pixels[0] = true
  }

  public tick() {
    const values = []
    values[0] = false

    for (let i = 0; i < this.pixels.length; i++) {
      values[i + 1] = this.pixels[i]
    }

    this.pixels = values

    if (this.pixels.length > this.height) {
      this.pixels = this.pixels.slice(0, this.height)
    }
  }
}
