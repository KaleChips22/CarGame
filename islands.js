function getLeftIsland() {
  const islandLeft = new THREE.Shape()

  islandLeft.absarc(
    -arcCenterX,
    0,
    innerTrackRadius, 
    arcAngle1,
    -arcAngle1,
    false
  )

  islandLeft.absarc(
    arcCenterX,
    0,
    outerTrackRadius, 
    Math.PI + arcAngle2,
    Math.PI - arcAngle2,
    true
  )

  return islandLeft
}

function getMiddleIsland() {
  const islandMiddle = new THREE.Shape()

  islandMiddle.absarc(
    -arcCenterX,
    0,
    innerTrackRadius, 
    arcAngle3,
    -arcAngle3,
    true
  )

  islandMiddle.absarc(
    arcCenterX,
    0,
    innerTrackRadius, 
    Math.PI + arcAngle3,
    Math.PI - arcAngle3,
    true
  )

  return islandMiddle
}

function getRightIsland() {
  const islandRight = new THREE.Shape()

  islandRight.absarc(
    arcCenterX,
    0,
    innerTrackRadius, 
    Math.PI - arcAngle1,
    Math.PI + arcAngle1,
    true
  )

  islandRight.absarc(
    -arcCenterX,
    0,
    outerTrackRadius, 
    -arcAngle2,
    arcAngle2,
    false
  )

  return islandRight
}

function getOuterField(mapWidth, mapHeight) {
  const field = new THREE.Shape()

  field.moveTo(-mapWidth / 2, -mapHeight / 2)
  field.lineTo(0, -mapHeight / 2)

  field.absarc(
    -arcCenterX,
    0,
    outerTrackRadius,
    -arcAngle4,
    arcAngle4,
    true
  )

  field.absarc(
    arcCenterX,
    0,
    outerTrackRadius,
    Math.PI - arcAngle4,
    Math.PI + arcAngle4,
    true
  )

  field.lineTo(0, -mapHeight / 2)
  field.lineTo(mapWidth / 2, -mapHeight / 2)
  field.lineTo(mapWidth / 2, mapHeight / 2)
  field.lineTo(-mapWidth / 2, mapHeight / 2)

  return field
} 