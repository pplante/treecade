const YELLOW = packRGB(255, 255, 51)
const RED = packRGB(255, 0, 0)
const ORANGE = packRGB(255, 128, 0)
const GREEN = packRGB(0, 255, 0)
const BLUE = packRGB(0, 0, 255)
const availableColors = [YELLOW, RED, ORANGE, GREEN, BLUE]

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max))
}

export function packRGB(red: number, green: number, blue: number) {
  // tslint:disable-next-line:no-bitwise
  return (red << 16) | (green << 8) | blue
}

export function getRandomColor() {
  return availableColors[getRandomInt(availableColors.length)]
}
