import { Particle } from "./Particle"

export class Confetti {
  sketch: HTMLElement
  mouseX: number
  mouseY: number
  partickles: Particle[]
  constructor(sketch: HTMLElement, mouseX: number, mouseY: number) {
    this.sketch = sketch
    this.mouseX = mouseX
    this.mouseY = mouseY
    this.partickles = []
    let TAU = Math.PI * 2
    let PI = Math.PI
    let rTh
    let rR
    let x
    let y 
    let rTh2
    let rR2
    let x2
    let y2
    for(let i = 0; i < this.randomRange(75, 150); i++) {
      rTh = this.randomRange(0, TAU)
      rR = this.randomRange(1, 2)
      x = rR * Math.cos(rTh) + this.mouseX
      y = rR * Math.sin(rTh) + this.mouseY
      this.partickles[i] = new Particle(x, y, this.randomRange(3, 6))
  
      rTh2 = this.randomRange(PI, TAU)
      rR2 = this.randomRange(0.1, 1.2)
      x2 = rR2 * Math.cos(rTh2)
      y2 = rR2 * Math.sin(rTh2)
      this.partickles[i].applyForce(x2, y2)
      this.partickles[i].applyForce(0, -1.6)
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