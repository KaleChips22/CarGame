let ready, playerAngleMoved, score
const scoreElement = document.getElementById('score')
let otherVehicles = []
let lastTimestamp
const speed = 0.0017
const playerAngleInitial = Math.PI
let accelerate, decelerate

function moveOtherVehicles(timeDelta) {
  otherVehicles.forEach(vehicle => {
    if (vehicle.clockwise) {
      vehicle.angle -= speed * timeDelta
    } else {
      vehicle.angle += speed * timeDelta
    }

    const vehicleX = Math.cos(vehicle.angle) * trackRadius + arcCenterX
    const vehicleY = Math.sin(vehicle.angle) * trackRadius
    const rotation = vehicle.angle  + (vehicle.clockwise ? -Math.PI / 2 : Math.PI / 2)

    vehicle.mesh.position.x = vehicleX
    vehicle.mesh.position.y = vehicleY
    vehicle.mesh.rotation.z = rotation
  })
}

function addVehicle() {
  const type = 'car'
  const mesh = Car()
  scene.add(mesh)

  const clockwise = Math.random() >= 0.5
  const angle = Math.random() * Math.PI * 2

  otherVehicles.push({ mesh, type, clockwise, angle, speed: 1 })
}

function movePlayerCar(timeDelta) {
  const playerSpeed = getPlayerSpeed()
  playerAngleMoved -= playerSpeed * timeDelta

  const totalPlayerAngle = playerAngleInitial + playerAngleMoved

  const playerX = Math.cos(totalPlayerAngle) * trackRadius - arcCenterX
  const playerY = Math.sin(totalPlayerAngle) * trackRadius

  playerCar.position.x = playerX
  playerCar.position.y = playerY

  playerCar.rotation.z = totalPlayerAngle - Math.PI / 2
}

function getPlayerSpeed() {
  if (accelerate) return speed * 2
  if (decelerate) return speed * 0.5
  return speed
}

function animation(timestamp) {
  if (!lastTimestamp) {
    lastTimestamp = timestamp
    return
  }

  const timeDelta = timestamp - lastTimestamp

  movePlayerCar(timeDelta)

  const laps = Math.floor(Math.abs(playerAngleMoved) / (Math.PI * 2))

  if (laps !== score) {
    score = laps
    scoreElement.innerText = score
    scoreElement.classList.remove('bounce')
    scoreElement.classList.add('bounce')

  }

  if (otherVehicles.length < (laps + 1) / 5) addVehicle()

  moveOtherVehicles(timeDelta)

  hitDetection()

  renderer.render(scene, camera)
  lastTimestamp = timestamp
}

reset()

function reset() {
  playerAngleMoved = 0
  movePlayerCar(0)
  score = 0
  scoreElement.innerText = score
  lastTimestamp = undefined

  otherVehicles.forEach(vehicle => {
    scene.remove(vehicle.mesh)
  })
  otherVehicles =[]

  renderer.render(scene, camera)
  ready = true
}

function startGame() {
  if (ready) {
    ready = false
    renderer.setAnimationLoop(animation)
  }
}

accelerate = false
decelerate = false

window.addEventListener('keydown', event => {
  if (event.key == 'ArrowUp') {
    startGame()
    accelerate = true
    return
  }

  if (event.key == 'ArrowDown') {
    decelerate = true
    return
  }

  if (event.key == 'R' || event.key == 'r') {
    reset()
    return
  }
})

window.addEventListener('keyup', event => {
  if (event.key == 'ArrowUp') {
    accelerate = false
    return
  }

  if (event.key == 'ArrowDown') {
    decelerate = false
    return
  }
})

function getHitZonePosition(center, angle, clockwise, distance) {
  const directionAngle = angle + clockwise ? -Math.PI / 2 : Math.PI / 2
  return {
    x: center.x + Math.cos(directionAngle) * distance,
    y: center.y + Math.sin(directionAngle) * distance
  }
}

function hitDetection() {

  const hit = otherVehicles.some(vehicle => {
    if (getDistance(playerCar.position, vehicle.mesh.position) <= 45) {
      return true
    }
  })

  if (hit) renderer.setAnimationLoop(null)
}

function getDistance(coordinate1, coordinate2) {
  return Math.sqrt(
    (coordinate2.x - coordinate1.x) ** 2 + (coordinate2.y - coordinate1.y) ** 2
  )
}