# ZIRIOS Universe

Futuristic luxury streetwear & digital-art immersive WebGL experience.

Built as a living digital art installation, not a conventional fashion website.

## Stack

- React 18 + TypeScript
- Vite
- Three.js
- React Three Fiber + Drei
- GSAP
- Zustand (state)
- Web Audio API (later)
- Custom GLSL shaders (later)

## Architecture (modular systems)

```
src/
├── experience/          # 3D root
│   ├── Experience.tsx
│   ├── WorldManager.tsx
│   ├── TypographyEngine/
│   ├── ParticleEngine/
│   ├── PhysicsEngine/
│   ├── CameraDirector/
│   ├── QuoteEngine/
│   ├── AudioEngine/
│   ├── PostFXManager/
│   └── PerformanceManager/
├── worlds/              # 10 immersive environments
│   ├── BloodRitual/
│   ├── EditorialStudio/
│   ├── CosmicInfinity/
│   ├── InfernoHearth/
│   ├── CyberpunkDistrict/
│   ├── MatrixRain/
│   ├── OceanDepths/
│   ├── SilentVoid/      ← implemented
│   ├── GlassDimension/
│   └── AuroraSky/
├── ui/                  # Premium minimal editorial UI
├── store/               # Zustand stores
├── shaders/             # GLSL
└── utils/
```

## Current Status

**Part 1 — Scaffold complete** ✅  
**Part 2 — WorldManager + Silent Void** ✅

- World switching system via Zustand
- Silent Void fully implemented:
  - Near-black environment
  - Exponential fog
  - Sparse dust particles
  - Distant stars
  - Extremely slow continuous drift
  - Minimal meditative atmosphere
- UI shows current world name

## How to run

```bash
npm install
npm run dev
```

## Roadmap (parts)

1. ✅ Project scaffold + basic scene + UI shell
2. ✅ WorldManager + first world (Silent Void)
3. TypographyEngine (procedural 3D words)
4. Quote system
5. Physics (repulsion / shockwave)
6. CameraDirector modes
7. Particle systems per world
8. Remaining 9 worlds
9. PostFX + Audio + Command Center (Ctrl+K)
10. Archive + polish + performance tiers

---

ZIRIOS — Enter the universe.
