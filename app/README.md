# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
## FE-11 — 3D Career Journey

LaunchPad AI includes an interactive 3D career journey that visualizes the path from defining a target role to becoming job ready.

### Experience

The journey contains six stages:

1. Target Role — interactive 3D compass
2. Skills — interactive skill orbit
3. Projects — interactive project workspace
4. CV — interactive CV analysis
5. Interview — interactive interview simulation
6. Job Ready — interactive rocket launch

Each stage provides a meaningful interaction rather than being purely decorative.

### Interaction

The experience supports:

- Orbit and touch controls
- Direct interaction with 3D objects
- Stage selection
- Visual state transitions
- Reduced-motion behavior
- Mobile-friendly interaction

### Performance

The 3D experience uses procedural low-poly geometry rather than external 3D model files, keeping the asset footprint small.

The Canvas is lazy-loaded so the 3D scene is not included in the initial page render.

The scene uses a limited number of lightweight geometries, materials and lights to keep rendering practical on modern mobile and desktop devices.

A reduced-motion and low-power fallback avoids loading the interactive 3D experience when motion should be minimized or the device reports limited CPU resources.

### FE-10 Motion Principles Applied

The FE-11 experience follows the same motion principles introduced in FE-10:

- Transform-based animation
- Short intentional transitions
- No layout-dependent animation
- Interruptible interactions
- Reduced-motion support
- Visual feedback for interaction states

### Future Improvements

With more time, the experience could add:

- Optimized environment lighting
- More detailed career-specific 3D assets
- Persistent user progress
- Career-stage completion animations
- WebGL performance telemetry
- More advanced accessibility controls