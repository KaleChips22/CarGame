const scene = new THREE.Scene()

const playerCar = Car()
scene.add(playerCar)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(ambientLight)

const dirLight = new THREE.DirectionalLight(0xffffff, 0.6)
dirLight.position.set(100, -300, 400)
scene.add(dirLight)

const aspectRatio = window.innerWidth / window.innerHeight
const cameraWidth = 960
const cameraHeight = cameraWidth / aspectRatio

const camera = new THREE.OrthographicCamera(
  cameraWidth / -2,
  cameraWidth / 2,
  cameraHeight / 2,
  cameraHeight / -2,
  0,
  1000
)
camera.position.set(0, -230, 300)
camera.lookAt(0, 0, 0)

renderMap(cameraWidth, cameraHeight * 2)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)
document.body.appendChild(renderer.domElement)