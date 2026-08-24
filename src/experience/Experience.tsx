import { WorldManager } from './WorldManager'

/**
 * Experience — root of the 3D scene.
 * Hosts WorldManager and later TypographyEngine, ParticleEngine, etc.
 */
export function Experience() {
  return (
    <>
      <WorldManager />
      {/* Future systems will live here:
          <TypographyEngine />
          <ParticleEngine />
          <PhysicsEngine />
          <CameraDirector />
          <QuoteEngine />
          <PostFXManager />
      */}
    </>
  )
}
