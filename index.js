/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./scripts/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scripts/engine.js":
/*!***************************!*\
  !*** ./scripts/engine.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Engine; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ \"./scripts/globals.js\");\n\n\nclass Engine {\n  constructor(){\n    this._entities = []\n    this._onTick = () => {}\n    this.triggerEntityTicksForward = this.triggerEntityTicksForward.bind(this)\n    this.triggerEntityTicksBackward = this.triggerEntityTicksBackward.bind(this)\n  }\n\n  onTick(func){\n    this._onTick = func\n  }\n\n  triggerEntityTicksForward() {\n    this._entities.forEach(entity => entity.onTick())\n    this._onTick()\n  }\n\n  triggerEntityTicksBackward() {\n    this._onTick()\n    this._entities.forEach(entity => {\n      if (entity.type === _globals__WEBPACK_IMPORTED_MODULE_0__[\"types\"].ENEMY) entity.onTickBack()\n        else entity.onTick()\n    })\n  }\n\n  tickExternal(direction){\n    if (direction > 0) this.triggerEntityTicksForward()\n      else this.triggerEntityTicksBackward()\n    clearInterval(this.updateLoop)\n    this.updateLoop = setInterval(this.triggerEntityTicksForward, _globals__WEBPACK_IMPORTED_MODULE_0__[\"BIG_TICK_TIME\"])\n  }\n\n  run(){\n    this.drawLoop = (time) => {\n      _globals__WEBPACK_IMPORTED_MODULE_0__[\"context\"].clearRect(0, 0, _globals__WEBPACK_IMPORTED_MODULE_0__[\"$canvas\"].width, _globals__WEBPACK_IMPORTED_MODULE_0__[\"$canvas\"].height)\n      this._entities.forEach(entity => entity.draw(time))\n      requestAnimationFrame(this.drawLoop)\n    }\n    this.drawLoop()\n\n    this.updateLoop = setInterval(this.triggerEntityTicksForward, _globals__WEBPACK_IMPORTED_MODULE_0__[\"BIG_TICK_TIME\"])\n  }\n\n  addEntity(entity){\n    this._entities.push(entity)\n  }\n}\n\n\n//# sourceURL=webpack:///./scripts/engine.js?");

/***/ }),

/***/ "./scripts/entities.js":
/*!*****************************!*\
  !*** ./scripts/entities.js ***!
  \*****************************/
/*! exports provided: Entity, Background, Enemy, Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Entity\", function() { return Entity; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Background\", function() { return Background; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Enemy\", function() { return Enemy; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Player\", function() { return Player; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ \"./scripts/globals.js\");\n\n\n\nclass Entity {\n  constructor({ size = [1, 2],  speed = 1,  image = 'truck.png',  position = [0, 0] }){\n    this.img = new Image()\n    this.img.src = image\n\n    this.size = size\n    this.speed = speed\n    this.position = position\n  }\n\n  onTick () {\n    this.lastPosition = this.position\n  }\n\n  draw(){\n    const [x, y] = this.position\n    const [sizeX, sizeY] = this.size\n    const width = sizeX * _globals__WEBPACK_IMPORTED_MODULE_0__[\"UNITS\"]\n    const height = sizeY * _globals__WEBPACK_IMPORTED_MODULE_0__[\"UNITS\"]\n    const canvasX = x * _globals__WEBPACK_IMPORTED_MODULE_0__[\"UNITS\"]\n    const canvasY = _globals__WEBPACK_IMPORTED_MODULE_0__[\"$canvas\"].height - (y * _globals__WEBPACK_IMPORTED_MODULE_0__[\"UNITS\"]) - height\n    _globals__WEBPACK_IMPORTED_MODULE_0__[\"context\"].drawImage(this.img, canvasX, canvasY, width, height)\n  }\n\n}\n\n// Like a single Entity but creates two big bois and scrolls them automatically\nclass Background extends Entity {\n  constructor(props){\n    super(props)\n    this.tick = 0\n  }\n\n  draw(){\n    this.tick += 10 // Road speed in pixels per tick\n    if (this.tick >= _globals__WEBPACK_IMPORTED_MODULE_0__[\"$canvas\"].height) this.tick = 0\n    const width = _globals__WEBPACK_IMPORTED_MODULE_0__[\"$canvas\"].width\n    const height = _globals__WEBPACK_IMPORTED_MODULE_0__[\"$canvas\"].height\n    const canvasX = 0\n    const canvasY = this.tick\n    _globals__WEBPACK_IMPORTED_MODULE_0__[\"context\"].drawImage(this.img, canvasX, canvasY - height, width, height)\n    _globals__WEBPACK_IMPORTED_MODULE_0__[\"context\"].drawImage(this.img, canvasX, canvasY, width, height)\n  }\n}\n\nclass Enemy extends Entity {\n  constructor(props){\n    super(props)\n    this.type = _globals__WEBPACK_IMPORTED_MODULE_0__[\"types\"].ENEMY\n    const availableX = _globals__WEBPACK_IMPORTED_MODULE_0__[\"$canvas\"].width / _globals__WEBPACK_IMPORTED_MODULE_0__[\"UNITS\"]\n    const availableY = _globals__WEBPACK_IMPORTED_MODULE_0__[\"$canvas\"].height / _globals__WEBPACK_IMPORTED_MODULE_0__[\"UNITS\"]\n    this.position[0] = Math.floor((Math.random() * availableX))\n    this.position[1] = (availableY - this.size[1]) // in this instance availableX is the amount offset caused by initial popstating\n  }\n\n  onTick() {\n    this.position[1] -= this.speed\n  }\n\n  onTickBack() {\n    this.position[1] += this.speed\n  }\n}\n\nclass Player extends Entity {\n  constructor(props){\n    super(props)\n    this.type = _globals__WEBPACK_IMPORTED_MODULE_0__[\"types\"].PLAYER\n    this.animatingTicks = 0\n  }\n  onTick(){ // todo: refactor to onNewPosition\n    if (this.moving) return\n    this.lastPosition = [ this.position[0], this.position[1]]\n    this.position[0] = history.state.position\n    this.direction = this.position[0] - this.lastPosition[0]\n    if (this.lastPosition[0] !== this.position[0]) this.moving = true\n  }\n  draw(){\n    const frames_to_move_duration = 10\n    if (this.moving){\n      console.log('moving')\n      this.animatingTicks++ // todo: refactor to support X/Y movement\n      this.position[0] = this.lastPosition[0] + ((this.animatingTicks / frames_to_move_duration) * this.direction)\n      if (this.animatingTicks >= frames_to_move_duration) {\n        this.animatingTicks = 0\n        this.moving = false\n      }\n    }\n    super.draw()\n  }\n}\n\n//# sourceURL=webpack:///./scripts/entities.js?");

/***/ }),

/***/ "./scripts/globals.js":
/*!****************************!*\
  !*** ./scripts/globals.js ***!
  \****************************/
/*! exports provided: $canvas, context, UNITS, BIG_TICK_TIME, types */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$canvas\", function() { return $canvas; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"context\", function() { return context; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UNITS\", function() { return UNITS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BIG_TICK_TIME\", function() { return BIG_TICK_TIME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"types\", function() { return types; });\n// Globals\nconst $canvas = document.getElementById('game')\nconst context = $canvas.getContext('2d')\nconst UNITS = 32\nconst BIG_TICK_TIME = 400\nconst types = {\n  'PLAYER': 'PLAYER',\n  'ENEMY': 'ENEMY'\n}\n\n//# sourceURL=webpack:///./scripts/globals.js?");

/***/ }),

/***/ "./scripts/index.js":
/*!**************************!*\
  !*** ./scripts/index.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine */ \"./scripts/engine.js\");\n/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities */ \"./scripts/entities.js\");\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./globals */ \"./scripts/globals.js\");\n\n\n\n\n\n\n// Set up browser history controls\nhistory.replaceState({\n  position: 0\n}, 0)\n\nfor (let i = 1; i < _globals__WEBPACK_IMPORTED_MODULE_2__[\"$canvas\"].width / _globals__WEBPACK_IMPORTED_MODULE_2__[\"UNITS\"]; i++) {\n  history.pushState({\n    position: i\n  }, i)\n}\n\nfor (let i = _globals__WEBPACK_IMPORTED_MODULE_2__[\"$canvas\"].width / _globals__WEBPACK_IMPORTED_MODULE_2__[\"UNITS\"] - 1; i > 1; i--) {\n  history.go(-1)\n}\n\n\nconst GameEngine = new _engine__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\n\nlet lastPosition = history.state.position\nwindow.addEventListener('popstate', () => {\n  if (history.state.position > lastPosition) GameEngine.tickExternal(1)\n    else GameEngine.tickExternal(-1)\n  lastPosition = history.state.position\n})\n\nGameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_1__[\"Background\"]({image: 'road.png'}))\nGameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_1__[\"Player\"]({image: 'car.png', position: [0, 1]}))\nlet count = 0\nGameEngine.onTick(() => {\n  count = ( count + 1 ) % 3\n  console.log(count)\n  if (count === 1) GameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_1__[\"Enemy\"]({image: 'truck.png'}))\n})\nGameEngine.run()\n\n//# sourceURL=webpack:///./scripts/index.js?");

/***/ })

/******/ });