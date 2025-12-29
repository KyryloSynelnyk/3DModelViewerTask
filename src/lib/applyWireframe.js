import * as THREE from 'three'

export function applyWireframe(object3d) {
  object3d.traverse((child) => {
    if (child && child.isMesh) {
      child.material = new THREE.MeshBasicMaterial({
        color: 0xe5e7eb,
        wireframe: true,
      })
    }
  })
}
