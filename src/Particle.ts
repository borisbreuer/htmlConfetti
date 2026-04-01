export class Particle {
  x: number
  y: number
  velX: number
  velY: number
  accX: number
  accY: number
  size: number
  opacity: number
  p: HTMLDivElement
  hsl: { h: number, s: number, l: number }
  constructor(x: number,  y: number, size: number) {
    this.x = x
    this.y = y
    this.velX = 0
    this.velY = 0
    this.accX = 0
    this.accY = 0
    this.size = size
    this.opacity = 1.0
    this.hsl = { h: Math.random() * 360, s: 65, l: 60 }
    this.p = document.createElement('div')
    this.p.style.left = this.x + 'px'
    this.p.style.top = this.y + 'px'
    this.p.style.backgroundColor = `hsl(${this.hsl.h} , ${this.hsl.s}%, ${this.hsl.l}%)`
    this.p.style.position = 'absolute'
    this.p.style.width = this.size + 'px'
    this.p.style.height = this.size + 'px'
    this.p.style.borderRadius = '50%'
    this.p.style.pointerEvents = 'none'
    this.p.style.opacity = this.opacity.toString()
  }

  move() {
    this.p.style.left = (this.x += this.accX) + 'px'
    this.p.style.top = (this.y += this.accY) + 'px'
    // this.hsl.l = Math.random() > 0.1 ? 60 : 40
    // this.hsl.s = Math.random() < 0.1 ? 55 : 75
    // this.p.style.backgroundColor = `hsl(${this.hsl.h} , ${this.hsl.s}%, ${this.hsl.l}%)`
  }
  
  applyForce(x: number, y: number) {
    this.accX += x / (this.size * 0.35)
    this.accY += y / (this.size * 0.2)
  }

  friction(s: number) {
    this.accX *= s
    this.accY *= s
  }

  applyAlpha(s: number) {
    this.opacity = this.opacity - s
    this.p.style.opacity = this.opacity.toString()
  }

  isOut() {
    return this.y > window.innerHeight + this.size
  }

  appendTo(element: HTMLElement) {
    element.append(this.p)
  }
  
  removeFrom(element: HTMLElement) {
    element.removeChild(this.p)
  }
}