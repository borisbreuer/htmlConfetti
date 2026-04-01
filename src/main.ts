import { ConfettiMouse } from './ConfettiMouse'
import { PSystem } from './ParticleSystem'
import './style.css'

const confettiApp = () => {
  const init = (sketch: HTMLDivElement, confettiMouse: ConfettiMouse, systems: PSystem[]) => {
    if(systems.length < 6) systems.push(new PSystem(sketch, confettiMouse.x, confettiMouse.y))
    }

  const animate = (systems: PSystem[]) => {
    let loop: boolean = true
    let animationID: number
    for(let i = systems.length - 1; i >= 0; i--) {
      systems[i].draw()
      if(systems[i].isEmpty()) {
        systems.splice(i, 1)
      }
    }
    animationID = requestAnimationFrame(() => animate(systems))
    if(loop !== true) cancelAnimationFrame(animationID)
  }

  const mouseMoveHandler = (event: MouseEvent, confettiMouse: ConfettiMouse) => {
    confettiMouse.x = event.clientX
    confettiMouse.y = event.clientY
  }

  const swapSketch = (sketch: HTMLDivElement) => {
    sketch.parentElement!.removeChild(sketch)
    let confluencePageID = '#page'
    const confPage = document.querySelector(confluencePageID)
    if(confPage) {
      confPage.append(sketch)
    } else {                               
      throw new Error('\n\nConfetti App 🎉:\nHTML-Element with id="' + confluencePageID + '" not found\n')
    } 
  }

  let sketch: HTMLDivElement = document.querySelector('#appConfetti') !
  swapSketch(sketch)

  let confettiMouse: ConfettiMouse = new ConfettiMouse()
  document.addEventListener('mousemove', (e) => mouseMoveHandler(e, confettiMouse))

  let systems: PSystem[] = []
  document.addEventListener('mousedown', () => init(sketch, confettiMouse, systems))
  animate(systems)
}

window.addEventListener('load', confettiApp)

