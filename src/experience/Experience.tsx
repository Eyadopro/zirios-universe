import { WorldManager } from './WorldManager'
import { TypographyEngine } from './TypographyEngine/TypographyEngine'
import { CameraDirector } from './CameraDirector'

/**
 * Experience — root of the 3D scene.
 */
export function Experience() {
  return (
    <>
      <WorldManager />
      <TypographyEngine />
      <CameraDirector />
    </>
  )
}
