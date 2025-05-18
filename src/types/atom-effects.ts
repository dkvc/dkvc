export interface Electron {
  orbitRadius: number
  angle: number
  speed: number
  color: string
  radius: number
}

export interface Atom {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  electrons: Electron[]
}
