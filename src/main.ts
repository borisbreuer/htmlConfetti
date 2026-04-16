import { Mouse } from './Mouse'
// import { ConfettiMouse } from './Mouse'
import { Confetti } from './Confetti'
import { Heart } from './Heart'
import './style.css'

const confettiApp = () => {
  const init = (sketch: HTMLDivElement, mouse: Mouse, systems: Confetti[] & Heart[]) => {
    if(systems.length < 6) {
      Math.random() > 0.50 ? systems.push(new Heart(sketch, mouse.x, mouse.y)) : systems.push(new Confetti(sketch, mouse.x, mouse.y))
    }
  }

  const animate = (systems: Confetti[] & Heart[]) => {
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

  const mouseMoveHandler = (event: MouseEvent, mouse: Mouse) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
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

  let mouse: Mouse = new Mouse()
  document.addEventListener('mousemove', (e) => mouseMoveHandler(e, mouse))

  let systems: Confetti[] & Heart[] = []
  document.addEventListener('mousedown', () => init(sketch, mouse, systems))
  animate(systems)
}

window.addEventListener('load', confettiApp)
