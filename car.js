const vehicleColors = [0xa52523, 0xbdb638, 0x78b14b, 0x0d1116, 0x1c1d21, 0x32383d, 0x454b4f, 0x999da0, 0xc2c4c6, 0x979a97, 0x637380, 0x63625c, 0x3c3f47, 0x444e54, 0x1d2129, 0x13181f, 0x26282a, 0x515554, 0x151921, 0x1e2429, 0x333a3c, 0x8c9095, 0x39434d, 0x506272, 0x1e232f, 0x363a3f, 0xa0a199, 0xd3d3d3, 0xb7bfca, 0x778794, 0xc00e1a, 0xda1918, 0xb6111b, 0xa51e23, 0x7b1a22, 0x8e1b1f, 0x6f1818, 0x49111d, 0xb60f25, 0xd44a17, 0xc2944f, 0xf78616, 0xcf1f21, 0x732021, 0xf27d20, 0xffc91f, 0x9c1016, 0xde0f18, 0x8f1e17, 0xa94744, 0xb16c51, 0x371c25, 0x132428, 0x122e2b, 0x12383c, 0x31423f, 0x155c2d, 0x1b6770, 0x66b81f, 0x22383e, 0x1d5a3f, 0x2d423f, 0x45594b, 0x65867f, 0x222e46, 0x233155, 0x304c7e, 0x47578f, 0x637ba7, 0x394762, 0xd6e7f1, 0x76afbe, 0x345e72, 0x0b9cf1, 0x2f2d52, 0x282c4d, 0x2354a1, 0x6ea3c6, 0x112552, 0x1b203e, 0x275190, 0x608592, 0x2446a8, 0x4271e1, 0x3b39e0, 0x1f2852]

function Car() {
  const car = new THREE.Group()

  const backWheel = new THREE.Mesh(
    new THREE.BoxBufferGeometry(12, 33, 12),
    new THREE.MeshLambertMaterial({ color: 0x333333 })
  )
  backWheel.position.z = 6
  backWheel.position.x = -18
  car.add(backWheel)

  const frontWheel = new THREE.Mesh(
    new THREE.BoxBufferGeometry(12, 33, 12),
    new THREE.MeshLambertMaterial({ color: 0x333333 })
  )
  frontWheel.position.z = 6
  frontWheel.position.x = 18
  car.add(frontWheel)

  const main = new THREE.Mesh(
    new THREE.BoxBufferGeometry(60, 30, 15),
    new THREE.MeshLambertMaterial({ color: pickRandom(vehicleColors) })
  )
  main.position.z = 12
  car.add(main)

  const carFrontTexture = getCarFrontTexture()
  carFrontTexture.center = new THREE.Vector2(0.5, 0.5)
  carFrontTexture.rotation = Math.PI / 2
  const carBackTexture = getCarFrontTexture()
  carBackTexture.center = new THREE.Vector2(0.5, 0.5)
  carBackTexture.rotation = -Math.PI / 2
  const carLeftTexture = getCarSideTexture()
  const carRightTexture = getCarSideTexture()

  const cabin = new THREE.Mesh(
    new THREE.BoxBufferGeometry(33, 24, 12), [
      new THREE.MeshLambertMaterial({ map: carFrontTexture }),
      new THREE.MeshLambertMaterial({ map: carBackTexture }),
      new THREE.MeshLambertMaterial({ map: carLeftTexture }),
      new THREE.MeshLambertMaterial({ map: carRightTexture }),
      new THREE.MeshLambertMaterial({ color: 0xffffff }),
      new THREE.MeshLambertMaterial({ color: 0xffffff })
    ]
  )
  cabin.position.x = -6
  cabin.position.z = 25.5
  car.add(cabin)

  return car
}

function getCarFrontTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 32
  const context = canvas.getContext('2d')

  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, 64, 32)

  context.fillStyle = '#666666'
  context.fillRect(8, 8, 48, 24)

  return new THREE.CanvasTexture(canvas)
}

function getCarSideTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 32
  const context = canvas.getContext('2d')

  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, 128, 32)

  context.fillStyle = '#666666'
  context.fillRect(10, 8, 38, 24)
  context.fillRect(58, 8, 60, 24)

  return new THREE.CanvasTexture(canvas)
}

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)]
}