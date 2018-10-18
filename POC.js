/*
  controls
*/
history.replaceState({
  position: 0
}, 0)

for (let i = 1; i < 10; i++) {
  history.pushState({
    position: i
  }, i)
}

for (let i = 9; i > 0; i--) {
  history.go(-1)
}

/* 
  loop
*/
requestAnimationFrame(function loop(time){
  draw(time)
  requestAnimationFrame(loop)
})

let big_tick = 0

let bigInt = undefined
function startInterval(){
  bigInt = setInterval(() => {
    big_tick++
    if (big_tick >= 9) big_tick = 0
  }, 800)
}

function resetInterval(){
  clearInterval(bigInt)
  startInterval()
}

/* 
  game
*/
const $canvas = document.getElementById('game')
const context = $canvas.getContext('2d')

const units = $canvas.width / 10

const car = new Image()
car.src = 'car.png'

const road = new Image()
road.src = 'road.png'

const truck = new Image()
truck.src = 'truck.png'

const drawCar = (time) => {
  context.drawImage(car, history.state.position * units, $canvas.height - units * 1.6, units, units * 1.6)
}



lastPosition = history.state.position

// Todo: move this state into history.state to be pure
window.onpopstate = () => {
  if (history.state.position > lastPosition) big_tick++
  else big_tick--
  resetInterval()

  lastPosition = history.state.position
}

const drawTruck = (time) => {
  context.drawImage(truck, 5 * units, big_tick * units, 60, 120)
}


let animationTicks = 0
const drawRoad = (time) => {
  animationTicks = (animationTicks + 10) % 600
  context.drawImage(road, 0, animationTicks - $canvas.height, $canvas.height, $canvas.width)
  context.drawImage(road, 0, animationTicks, $canvas.height, $canvas.width)
}

function draw(time) {
  context.clearRect(0, 0, $canvas.width, $canvas.height)
  drawRoad(time)
  drawCar(time)
  drawTruck(time)
}