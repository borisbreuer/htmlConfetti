import { Particle } from "./Particle"

export class Heart {
  sketch: HTMLElement
  mouseX: number
  mouseY: number
  partickles: Particle[]
  amount: number

  constructor(sketch: HTMLElement, mouseX: number, mouseY: number) {
    this.sketch = sketch
    this.mouseX = mouseX
    this.mouseY = mouseY
    this.partickles = []
    let TAU = Math.PI * 2
    // let PI = Math.PI
    // this.amount = this.randomRange(150, 200)
    this.amount = 150

    let x2
    let y2
    for(let i = 0; i < this.amount; i++) {
      let angle = (4 * TAU / (this.amount-1)) * i

      let x = Math.sqrt(2) * Math.pow(Math.sin(angle), 3)
      let y = -1 * (Math.pow(-Math.cos(angle), 3) - Math.pow(Math.cos(angle), 2) + 2 * Math.cos(angle)) * 0.6

      let xr = x * this.randomRange(0.95, 1.3) + this.mouseX
      let yr = y * this.randomRange(0.95, 1.3) + this.mouseY

      this.partickles[i] = new Particle(xr, yr, this.randomRange(5.5, 6.2))
      let mult = this.randomRange(1.5, 1.8)
      x2 = x * mult
      y2 = y * mult

      this.partickles[i].applyForce(x2, y2)
      this.partickles[i].applyForce(0, -2)
    }
  }

  draw() {
    for(let i = this.partickles.length - 1; i >= 0; i--) {
      this.partickles[i].appendTo(this.sketch)
      this.partickles[i].friction(0.9999)
      this.partickles[i].applyForce(0, 0.035)
      // this.partickles[i].applyAlpha(0.0035)
      this.partickles[i].applyAlpha(0.005)
      this.partickles[i].move()
      if(this.partickles[i].isOut() || this.partickles[i].opacity <= 0) {
        this.partickles[i].removeFrom(this.sketch)
        this.partickles.splice(i, 1)
      }
    }
  }

  randomRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  isEmpty() {
    return this.partickles.length === 0
  }
}