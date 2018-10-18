import {
  context,
  $canvas,
  UNITS,
  types
} from './globals'


export class Entity {
  constructor({ size = [1, 2],  speed = 1,  image = 'truck.png',  position = [0, 0] }){
    this.img = new Image()
    this.img.src = image

    this.size = size
    this.speed = speed
    this.position = position
  }

  onTick () {
    this.lastPosition = this.position
  }

  draw(){
    const [x, y] = this.position
    const [sizeX, sizeY] = this.size
    const width = sizeX * UNITS
    const height = sizeY * UNITS
    const canvasX = x * UNITS
    const canvasY = $canvas.height - (y * UNITS) - height
    context.drawImage(this.img, canvasX, canvasY, width, height)
  }

}

// Like a single Entity but creates two big bois and scrolls them automatically
export class Background extends Entity {
  constructor(props){
    super(props)
    this.tick = 0
  }

  draw(){
    this.tick += 10 // Road speed in pixels per tick
    if (this.tick >= $canvas.height) this.tick = 0
    const width = $canvas.width
    const height = $canvas.height
    const canvasX = 0
    const canvasY = this.tick
    context.drawImage(this.img, canvasX, canvasY - height, width, height)
    context.drawImage(this.img, canvasX, canvasY, width, height)
  }
}

export class Enemy extends Entity {
  constructor(props){
    super(props)
    this.type = types.ENEMY
    const availableX = $canvas.width / UNITS
    const availableY = $canvas.height / UNITS
    this.position[0] = Math.floor((Math.random() * availableX))
    this.position[1] = (availableY - this.size[1]) // in this instance availableX is the amount offset caused by initial popstating
  }

  onTick() {
    this.position[1] -= this.speed
  }

  onTickBack() {
    this.position[1] += this.speed
  }
}

export class Player extends Entity {
  constructor(props){
    super(props)
    this.type = types.PLAYER
    this.animatingTicks = 0
  }
  onTick(){ // todo: refactor to onNewPosition
    if (this.moving) return
    this.lastPosition = [ this.position[0], this.position[1]]
    this.position[0] = history.state.position
    this.direction = this.position[0] - this.lastPosition[0]
    if (this.lastPosition[0] !== this.position[0]) this.moving = true
  }
  draw(){
    const frames_to_move_duration = 10
    if (this.moving){
      console.log('moving')
      this.animatingTicks++ // todo: refactor to support X/Y movement
      this.position[0] = this.lastPosition[0] + ((this.animatingTicks / frames_to_move_duration) * this.direction)
      if (this.animatingTicks >= frames_to_move_duration) {
        this.animatingTicks = 0
        this.moving = false
      }
    }
    super.draw()
  }
}