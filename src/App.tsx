import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Experience } from './experience/Experience'
import { UI } from './ui/UI'

export default function App() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50, near: 0.1, far: 200 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        style={{ position: 'fixed', inset: 0 }}
      >
        <color attach="background" args={['#000000']} />
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>

      <UI />
    </>
  )
}
