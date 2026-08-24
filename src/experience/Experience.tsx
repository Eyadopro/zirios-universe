import { WorldManager } from './WorldManager'
import { TypographyEngine } from './TypographyEngine/TypographyEngine'

/**
 * Experience — root of the 3D scene.
 * Hosts WorldManager + TypographyEngine + future systems.
 */
export function Experience() {
  return (
    <>
      <WorldManager />
      <TypographyEngine />
      {/* Future systems:
          <ParticleEngine />
          <PhysicsEngine />
          <CameraDirector />
          <QuoteEngine />
          <PostFXManager />
      */}
    </>
  )
}
