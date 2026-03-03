import type { Candle } from './types'

export class ReplayController {
  private data: Candle[]

  private pointer: number

  constructor(data: Candle[], startPointer = 50) {
    this.data = data
    this.pointer = Math.min(Math.max(1, startPointer), data.length)
  }

  stepForward() {
    if (this.pointer < this.data.length) {
      this.pointer += 1
    }
    return this.getVisibleData()
  }

  stepBackward() {
    if (this.pointer > 1) {
      this.pointer -= 1
    }
    return this.getVisibleData()
  }

  reset(startPointer = 50) {
    this.pointer = Math.min(Math.max(1, startPointer), this.data.length)
    return this.getVisibleData()
  }

  setData(data: Candle[]) {
    this.data = data
    this.pointer = Math.min(this.pointer, data.length)
    return this.getVisibleData()
  }

  getPointer() {
    return this.pointer
  }

  getVisibleData() {
    return this.data.slice(0, this.pointer)
  }
}