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
│   ├── TypographyEngine/   ← implemented
│   ├── ParticleEngine/
│   ├── PhysicsEngine/
│   ├── CameraDirector/
│   ├── QuoteEngine/
│   ├── AudioEngine/
│   ├── PostFXManager/
│   └── PerformanceManager/
├── worlds/              # 10 immersive environments
│   ├── SilentVoid/      ← implemented
│   └── ... (others coming)
├── ui/
├── store/
└── ...
```

## Current Status

**Part 1** ✅ Scaffold  
**Part 2** ✅ WorldManager + Silent Void  
**Part 3** ✅ TypographyEngine

### TypographyEngine features:
- 32 procedural floating words from vocabulary
- Mix of huge, medium and tiny distant words
- Independent position / rotation / velocity / opacity
- Slow continuous drift + soft boundary wrapping
- One prominent "ZIRIOS" near center
- Designed to feel dense and cinematic inside the void

## How to run

```bash
npm install
npm run dev
```

## Roadmap

1. ✅ Scaffold
2. ✅ WorldManager + Silent Void
3. ✅ TypographyEngine
4. Quote system
5. Physics (cursor repulsion + click shockwave)
6. CameraDirector
7. More worlds + particles
8. PostFX + Audio + Ctrl+K Command Center
9. Archive + polish + performance tiers

---

ZIRIOS — Enter the universe.
