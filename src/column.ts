export class Column {
  get lastPixel(): boolean {
    return this.pixels[this.pixels.length - 1]
  }

  public static fromString(val: string) {
    const column = new Column(val.length)
    column.pixels = val.split('').map(v => v === '*')
    return column
  }

  public direction: number
  public pixels: boolean[]

  constructor(public readonly height: number) {
    this.pixels = []
    this.direction = 1

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
    let values = []
    values[0] = false

    if (this.direction === 1) {
      for (let i = 0; i < this.pixels.length; i++) {
        values[i + 1] = this.pixels[i]
      }
    } else if (this.direction === -1) {
      values = this.pixels.slice(1, this.height)
      values.push(false)
    }

    this.pixels = values

    if (this.pixels.length > this.height) {
      this.pixels = this.pixels.slice(0, this.height)
    }
  }

  public setAll(val: boolean) {
    this.pixels.forEach((_, i) => (this.pixels[i] = val))
  }
}
