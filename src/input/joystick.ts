import HID, { Device } from 'node-hid'
import { Controller } from './controller'

export class Joystick extends Controller {
  public static supportedDevices() {
    return HID.devices().filter((device: Device) => device.vendorId === 121)
  }

  private keysDown: string[]

  // Zero Delay USB Encoder button presses
  //      0       1       2       3       4      5       6        7
  // K1: 127     127     127     127     127     31      0       192
  // K2: 127     127     127     127     127     47      0       192
  // K3: 127     127     128     127     127     79      0       192
  // K4: 127     127     129     127     127     143     0       192
  // K5: 127     127     126     127     127     15      1       192
  // K6: 127     127     127     127     127     15      2       192
  // AL: 0       127     127     127     127     15      0       192
  // AR: 255     127     127     127     127     15      0       192
  // AD: 127     255     127     127     127     15      0       192
  // AU: 127     0       123     127     127     15      0       192

  private keyMap = {
    DOWN: (data: Buffer) => data[1] === 255,
    LEFT: (data: Buffer) => data[0] === 0,
    RIGHT: (data: Buffer) => data[0] === 255,
    UP: (data: Buffer) => data[1] === 0,

    K1: (data: Buffer) => data[5] === 31,
    K2: (data: Buffer) => data[5] === 47,
    K3: (data: Buffer) => data[5] === 79,
    K4: (data: Buffer) => data[5] === 143,
    K5: (data: Buffer) => data[5] === 15 && data[6] === 1,
    K6: (data: Buffer) => data[5] === 15 && data[6] === 2,
  }
  private joystick: HID.HID

  constructor() {
    super()
    this.keysDown = []
    this.joystick = new HID.HID(Joystick.supportedDevices()[0].path)

    this.joystick.on('data', (data: Buffer) => {
      for (const key of Object.keys(this.keyMap)) {
        // @ts-ignore
        const isPressed = this.keyMap[key]
        if (isPressed(data)) {
          if (!this.keysDown.includes(key)) {
            this.keyPressed(key)
            this.keysDown.push(key)
          }
        } else {
          this.keysDown = this.keysDown.filter(k => k !== key)
        }
      }
    })
  }

  public dispose(): void {
    this.joystick.close()
  }
}
