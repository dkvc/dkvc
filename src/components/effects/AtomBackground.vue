<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import type { Atom } from '@/types/atom-effects'

/* Fixed Default Configuration. TODO: Make it configurable */
const DESKTOP_NUM_ATOMS = 60
const MOBILE_NUM_ATOMS = 30
const MOBILE_BREAKPOINT = 768

const isMobileScreen = ref(false)
const checkScreenSize = () => {
  if (typeof window !== 'undefined') {
    isMobileScreen.value = window.innerWidth < MOBILE_BREAKPOINT
  }
}

const config = computed(() => ({
  NUM_ATOMS: isMobileScreen.value ? MOBILE_NUM_ATOMS : DESKTOP_NUM_ATOMS,
  ATOM_RADIUS: 2.5,
  MAX_SPEED: 0.3,
  CONNECTION_DISTANCE: 110,
  LINE_COLOR_BASE: 'rgba(200, 200, 220, ',
  ATOM_LINE_WIDTH: 0.4,

  // Electron config
  ELECTRONS_PER_ATOM_MIN: 1,
  ELECTRONS_PER_ATOM_MAX: 2,
  ELECTRON_RADIUS: 0.8,
  ELECTRON_ORBIT_RADIUS_MIN: 6,
  ELECTRON_ORBIT_RADIUS_MAX: 12,
  ELECTRON_SPEED_MIN: 0.02,
  ELECTRON_SPEED_MAX: 0.05,
}))

// sTates
const atomCanvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let atoms: Atom[] = []
let animationFrameId: number

function getRandomColor(): string {
  const hue = Math.random() * 360
  const saturation = 60 + Math.random() * 30
  const lightness = 50 + Math.random() * 15
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

// Creators for Atoms & Electrons
function createAtom(x: number, y: number, vx: number, vy: number): Atom {
  const nucleusColor = getRandomColor()
  const atom: Atom = {
    x,
    y,
    vx,
    vy,
    radius: config.value.ATOM_RADIUS,
    color: nucleusColor,
    electrons: [],
  }

  const numElectrons =
    Math.floor(
      Math.random() *
        (config.value.ELECTRONS_PER_ATOM_MAX - config.value.ELECTRONS_PER_ATOM_MIN + 1),
    ) + config.value.ELECTRONS_PER_ATOM_MIN
  for (let i = 0; i < numElectrons; i++) {
    let electronColor = getRandomColor()
    while (electronColor === nucleusColor) {
      // avoid same color
      electronColor = getRandomColor()
    }
    atom.electrons.push({
      orbitRadius:
        config.value.ELECTRON_ORBIT_RADIUS_MIN +
        Math.random() *
          (config.value.ELECTRON_ORBIT_RADIUS_MAX - config.value.ELECTRON_ORBIT_RADIUS_MIN),
      angle: Math.random() * Math.PI * 2,
      speed:
        (config.value.ELECTRON_SPEED_MIN +
          Math.random() * (config.value.ELECTRON_SPEED_MAX - config.value.ELECTRON_SPEED_MIN)) *
        (Math.random() < 0.5 ? 1 : -1),
      color: electronColor,
      radius: config.value.ELECTRON_RADIUS,
    })
  }
  return atom
}

function initAtoms() {
  if (!atomCanvasRef.value) return
  atoms = []
  const speed = config.value.MAX_SPEED
  for (let i = 0; i < config.value.NUM_ATOMS; i++) {
    atoms.push(
      createAtom(
        Math.random() * atomCanvasRef.value.width,
        Math.random() * atomCanvasRef.value.height,
        (Math.random() - 0.5) * 2 * speed,
        (Math.random() - 0.5) * 2 * speed,
      ),
    )
  }
  console.log(`Number of atoms: ${config.value.NUM_ATOMS}`)
}

function resizeCanvas() {
  if (atomCanvasRef.value && ctx) {
    atomCanvasRef.value.width = window.innerWidth
    atomCanvasRef.value.height = window.innerHeight
    checkScreenSize()
    initAtoms() // Recreate atoms on resize
  }
}

function animate() {
  if (!ctx || !atomCanvasRef.value) {
    animationFrameId = requestAnimationFrame(animate) // Keep trying if canvas not ready. TODO: maybe there is a better way to handle this!
    return
  }

  ctx.clearRect(0, 0, atomCanvasRef.value.width, atomCanvasRef.value.height)

  for (let i = 0; i < atoms.length; i++) {
    const atomA = atoms[i]

    // Limit Nucleus Speed
    const speedSq = atomA.vx * atomA.vx + atomA.vy * atomA.vy
    const maxSpeedSq = config.value.MAX_SPEED * config.value.MAX_SPEED
    if (speedSq > maxSpeedSq) {
      const speedVal = Math.sqrt(speedSq)
      atomA.vx = (atomA.vx / speedVal) * config.value.MAX_SPEED
      atomA.vy = (atomA.vy / speedVal) * config.value.MAX_SPEED
    }

    // Update pos
    atomA.x += atomA.vx
    atomA.y += atomA.vy

    // Nucleus Boundary Collision (Wrap around)
    if (atomA.x < -atomA.radius) atomA.x = atomCanvasRef.value.width + atomA.radius
    if (atomA.x > atomCanvasRef.value.width + atomA.radius) atomA.x = -atomA.radius
    if (atomA.y < -atomA.radius) atomA.y = atomCanvasRef.value.height + atomA.radius
    if (atomA.y > atomCanvasRef.value.height + atomA.radius) atomA.y = -atomA.radius

    // Draw Nucleus
    ctx.fillStyle = atomA.color
    ctx.beginPath()
    ctx.arc(atomA.x, atomA.y, atomA.radius, 0, Math.PI * 2)
    ctx.fill()

    // Update and Draw Electrons
    atomA.electrons.forEach((electron) => {
      electron.angle += electron.speed
      const electronX = atomA.x + Math.cos(electron.angle) * electron.orbitRadius
      const electronY = atomA.y + Math.sin(electron.angle) * electron.orbitRadius
      if (ctx) {
        ctx.fillStyle = electron.color
        ctx.beginPath()
        ctx.arc(electronX, electronY, electron.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    })

    // Draw Connections to other Atoms
    for (let j = i + 1; j < atoms.length; j++) {
      const atomB = atoms[j]
      const dx = atomA.x - atomB.x
      const dy = atomA.y - atomB.y
      const distSq = dx * dx + dy * dy

      if (distSq < config.value.CONNECTION_DISTANCE * config.value.CONNECTION_DISTANCE) {
        const dist = Math.sqrt(distSq)
        const opacity = Math.max(0, 1 - dist / config.value.CONNECTION_DISTANCE)
        ctx.strokeStyle = `${config.value.LINE_COLOR_BASE}${opacity * opacity})` // Fade faster
        ctx.lineWidth = config.value.ATOM_LINE_WIDTH
        ctx.beginPath()
        ctx.moveTo(atomA.x, atomA.y)
        ctx.lineTo(atomB.x, atomB.y)
        ctx.stroke()
      }
    }
  }
  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  if (atomCanvasRef.value) {
    ctx = atomCanvasRef.value.getContext('2d')
    if (!ctx) {
      console.error('Failed to get 2D context for atom background')
      return
    }
    checkScreenSize()
    resizeCanvas()
    animate()
    window.addEventListener('resize', resizeCanvas)
  }
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<template>
  <canvas ref="atomCanvasRef" class="atom-background-canvas"></canvas>
</template>

<style scoped>
.atom-background-canvas {
  display: block;
  position: fixed; /* Cover the entire viewport */
  top: 0;
  left: 0;
  z-index: -1; /* behind other content */
  width: 100%;
  height: 100%;
}
</style>
