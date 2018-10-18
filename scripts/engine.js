import {
  context,
  $canvas,
  BIG_TICK_TIME,
  types
} from './globals'

export default class Engine {
  constructor(){
    this._entities = []
    this.triggerEntityTicksForward = this.triggerEntityTicksForward.bind(this)
    this.triggerEntityTicksBackward = this.triggerEntityTicksBackward.bind(this)
  }

  triggerEntityTicksForward() {
    this._entities.forEach(entity => entity.onTick())
  }

  triggerEntityTicksBackward() {
    this._entities.forEach(entity => {
      if (entity.type === types.ENEMY) entity.onTickBack()
        else entity.onTick()
    })
  }

  tickExternal(direction){
    if (direction > 0) this.triggerEntityTicksForward()
      else this.triggerEntityTicksBackward()
    clearInterval(this.updateLoop)
    this.updateLoop = setInterval(this.triggerEntityTicksForward, BIG_TICK_TIME)
  }

  run(){
    this.drawLoop = (time) => {
      context.clearRect(0, 0, $canvas.width, $canvas.height)
      this._entities.forEach(entity => entity.draw(time))
      requestAnimationFrame(this.drawLoop)
    }
    this.drawLoop()

    this.updateLoop = setInterval(this.triggerEntityTicksForward, BIG_TICK_TIME)
  }

  addEntity(entity){
    this._entities.push(entity)
  }
}
