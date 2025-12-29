import { OrbitControls } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'
import { applyWireframe } from '../lib/applyWireframe.js'
import { fitCameraToObject } from '../lib/fitCameraToObject.js'

function Scene({ model, mode }) {
  const controlsRef = useRef(null)
  const { camera } = useThree()

  const cloned = useMemo(() => {
    if (!model) return null
    const c = SkeletonUtils.clone(model)
    if (mode === 'wireframe') {
      applyWireframe(c)
    }
    return c
  }, [model, mode])

  useLayoutEffect(() => {
    if (!cloned) return
    fitCameraToObject({ camera, controls: controlsRef.current, object: cloned })
  }, [camera, cloned])

  return (
    <>
      {mode === 'wireframe' ? (
        <ambientLight intensity={1} />
      ) : (
        <>
          <ambientLight intensity={0.65} />
          <directionalLight position={[5, 7, 6]} intensity={1.1} />
          <directionalLight position={[-6, -3, -5]} intensity={0.35} />
        </>
      )}

      {cloned ? <primitive object={cloned} /> : null}

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.8}
        panSpeed={0.8}
        zoomSpeed={0.8}
      />
    </>
  )
}

export default function Viewport({ model, mode, bgColor }) {
  return (
    <Canvas
      camera={{ fov: 50, position: [0, 0, 5] }}
      gl={{ antialias: true, preserveDrawingBuffer: false }}
    >
      <color attach="background" args={[bgColor]} />
      <Scene model={model} mode={mode} />
    </Canvas>
  )
}
