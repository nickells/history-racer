import Engine from './engine'

import {
  Entity,
  Player,
  Enemy,
  Background
} from './entities'

import {
  $canvas,
  UNITS
} from './globals'

// Set up browser history controls
history.replaceState({
  position: 0
}, 0)

for (let i = 1; i < $canvas.width / UNITS; i++) {
  history.pushState({
    position: i
  }, i)
}

for (let i = $canvas.width / UNITS - 1; i > 1; i--) {
  history.go(-1)
}


const GameEngine = new Engine()

let lastPosition = history.state.position
window.addEventListener('popstate', () => {
  if (history.state.position > lastPosition) GameEngine.tickExternal(1)
    else GameEngine.tickExternal(-1)
  lastPosition = history.state.position
})

GameEngine.addEntity(new Background({image: 'road.png'}))
GameEngine.addEntity(new Player({image: 'car.png', position: [0, 1]}))
GameEngine.addEntity(new Enemy({image: 'truck.png'}))
GameEngine.addEntity(new Enemy({image: 'truck.png'}))
GameEngine.addEntity(new Enemy({image: 'truck.png'}))
GameEngine.addEntity(new Enemy({image: 'truck.png'}))
GameEngine.run()