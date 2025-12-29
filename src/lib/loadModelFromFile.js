import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

export async function loadModelFromFile(file) {
  if (!file || !(file instanceof File)) {
    throw new Error('No file provided.')
  }

  const ext = (file.name.split('.').pop() || '').toLowerCase()

  if (ext === 'glb' || ext === 'gltf') {
    let buffer
    try {
      buffer = await file.arrayBuffer()
    } catch {
      throw new Error('Failed to read the file.')
    }

    const loader = new GLTFLoader()

    let gltf
    try {
      gltf = await new Promise((resolve, reject) => {
        loader.parse(buffer, '', resolve, reject)
      })
    } catch {
      throw new Error('Failed to parse GLTF/GLB. The file may be corrupted or unsupported.')
    }

    const scene = gltf.scene || (gltf.scenes && gltf.scenes[0])
    if (!scene) {
      throw new Error('Failed to load GLTF/GLB: scene is missing.')
    }
    return scene
  }

  if (ext === 'obj') {
    let text
    try {
      text = await file.text()
    } catch {
      throw new Error('Failed to read the file.')
    }
    const loader = new OBJLoader()
    try {
      const obj = loader.parse(text)
      return obj
    } catch {
      throw new Error('Failed to parse OBJ. The file may be corrupted or unsupported.')
    }
  }

  if (ext === 'stl') {
    let buffer
    try {
      buffer = await file.arrayBuffer()
    } catch {
      throw new Error('Failed to read the file.')
    }

    const loader = new STLLoader()
    let geometry
    try {
      geometry = loader.parse(buffer)
    } catch {
      throw new Error('Failed to parse STL. The file may be corrupted or unsupported.')
    }
    geometry.computeVertexNormals()

    const material = new THREE.MeshStandardMaterial({ color: 0xcfcfcf })
    const mesh = new THREE.Mesh(geometry, material)
    const group = new THREE.Group()
    group.add(mesh)

    return group
  }

  throw new Error('Unsupported format. Please drop a .glb, .gltf, .obj or .stl file.')
}
