# Thread Management

This module provides thread management for rendering scenes with support for both standard and VR runtimes.

## useThread Hook

The `useThread` hook manages the rendering loop and can switch between standard and VR runtimes based on configuration.

### Usage

```tsx
import { useThread, RUNTIME_TYPES } from "art-os-package";

// Standard runtime (default)
const { update, pause } = useThread({
  currentFrameRef,
  renderer,
  runtime: RUNTIME_TYPES.STANDARD, // or just omit this prop
});

// VR runtime
const { update, pause, initVR } = useThread({
  currentFrameRef,
  renderer,
  runtime: RUNTIME_TYPES.VR,
});
```

### Parameters

- `currentFrameRef`: MutableRefObject<number> - Reference to store the animation frame ID
- `renderer`: WebGLRenderer - Three.js WebGL renderer instance
- `runtime`: RuntimeType (optional) - Either "standard" or "vr", defaults to "standard"

### Returns

- `update`: Function - Starts the rendering loop
- `pause`: Function - Stops the rendering loop
- `initVR`: Function (VR only) - Initializes VR session

### Runtime Types

- **Standard Runtime**: Uses the traditional `requestAnimationFrame` loop with post-processing
- **VR Runtime**: Enables WebXR support with VR button and session management

### Migration from useThreadWithPostProcessor

Replace:

```tsx
useThreadWithPostProcessor(currentFrameRef, renderer);
```

With:

```tsx
useThread({
  currentFrameRef,
  renderer,
  runtime: RUNTIME_TYPES.STANDARD, // or omit for default
});
```

### VR Support

When using the VR runtime:

1. The renderer automatically has XR enabled
2. A VR button is added to the page if WebXR is supported
3. The rendering loop adapts to VR session requirements
4. Falls back to standard rendering when VR session ends
