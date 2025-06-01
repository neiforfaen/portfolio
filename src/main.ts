import Alpine from 'alpinejs'
import './style.css'
import 'lenis/dist/lenis.css'
import Lenis from 'lenis'

declare global {
  interface Window {
    Alpine: typeof Alpine
  }
}

// Noise Gradient
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('noise') as HTMLCanvasElement | null
  if (!canvas) {
    return
  }

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const drawNoise = () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const randomValue = Math.random() * 255
      data[i] = randomValue
      data[i + 1] = randomValue
      data[i + 2] = randomValue
      data[i + 3] = 255
    }
    ctx.putImageData(imageData, 0, 0)
    requestAnimationFrame(drawNoise)
  }

  drawNoise()
})

// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
})

function raf(time: number) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Alpine.js initialization
window.Alpine = Alpine

Alpine.start()
