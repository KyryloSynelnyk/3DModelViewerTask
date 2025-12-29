import * as THREE from 'three'

export function fitCameraToObject({ camera, controls, object, offset = 1.4 }) {
  const box = new THREE.Box3().setFromObject(object)
  if (!Number.isFinite(box.min.x) || box.isEmpty()) {
    if (controls) {
      controls.target.set(0, 0, 0)
      controls.update()
    }
    camera.position.set(0, 0, 5)
    camera.near = 0.01
    camera.far = 10000
    camera.updateProjectionMatrix()
    return
  }

  const size = new THREE.Vector3()
  const center = new THREE.Vector3()
  box.getSize(size)
  box.getCenter(center)

  const maxDim = Math.max(size.x, size.y, size.z)
  const fov = (camera.fov * Math.PI) / 180
  let distance = maxDim / (2 * Math.tan(fov / 2))
  distance *= offset

  const direction = new THREE.Vector3(1, 1, 1).normalize()
  camera.position.copy(center).addScaledVector(direction, distance)

  camera.near = Math.max(distance / 1000, 0.01)
  camera.far = distance * 1000
  camera.updateProjectionMatrix()

  if (controls) {
    controls.target.copy(center)
    controls.update()
  }
}
