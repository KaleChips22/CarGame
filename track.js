const trackRadius = 225
const trackWidth = 45
const innerTrackRadius = trackRadius - trackWidth
const outerTrackRadius = trackRadius + trackWidth

const arcAngle1 = (1 / 3) * Math.PI

const deltaY = Math.sin(arcAngle1) * innerTrackRadius
const arcAngle2 = Math.asin(deltaY / outerTrackRadius)

const arcCenterX = (
  Math.cos(arcAngle1) * innerTrackRadius + Math.cos(arcAngle2) * outerTrackRadius
) / 2

const arcAngle3 = Math.acos(arcCenterX / innerTrackRadius)

const arcAngle4 = Math.acos(arcCenterX / outerTrackRadius)

function renderMap(mapWidth, mapHeight) {
  const lineMarkingsTexture = getLineMarkings(mapWidth, mapHeight)

  const planeGeometry = new THREE.PlaneBufferGeometry(mapWidth, mapHeight)
  const planeMaterial = new THREE.MeshLambertMaterial({
    map: lineMarkingsTexture
  })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  scene.add(plane)

  const islandLeft = getLeftIsland()
  const islandRight = getRightIsland()
  const islandMiddle = getMiddleIsland()
  const outerField = getOuterField(mapWidth, mapHeight)

  const fieldGeometry = new THREE.ExtrudeBufferGeometry(
    [islandLeft, islandMiddle, islandRight, outerField],
    { depth: 6, bevelEnabled: false }
  )

  const fieldMesh = new THREE.Mesh(fieldGeometry, [
    new THREE.MeshLambertMaterial({ color: 0x67c240 }),
    new THREE.MeshLambertMaterial({ color: 0x23311c })
  ])
  scene.add(fieldMesh)
}

function getLineMarkings(mapWidth, mapHeight) {
  const canvas = document.createElement('canvas')
  canvas.width = mapWidth
  canvas.height = mapHeight
  const context = canvas.getContext('2d')

  context.fillStyle = '#546E90'
  context.fillRect(0, 0, mapWidth, mapHeight)

  context.lineWidth = 2
  context.strokeStyle = '#E0FFFF'
  context.setLineDash([10, 14])

  context.beginPath()
  context.arc(
    mapWidth / 2 - arcCenterX,
    mapHeight / 2,
    trackRadius,
    0,
    Math.PI * 2
  )
  context.stroke()

  context.beginPath()
  context.arc(
    mapWidth / 2 + arcCenterX,
    mapHeight / 2,
    trackRadius,
    0,
    Math.PI * 2
  )
  context.stroke()

  return new THREE.CanvasTexture(canvas)
}