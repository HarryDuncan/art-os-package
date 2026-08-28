# Parameter Control API — External Controller Contract

Use this document as the source of truth when building a **controller UI outside** `art-os-package`. The package exposes live mutation helpers only; it does **not** ship control widgets.

## Goal

Alter Three.js scene parameters **while the runtime is rendering**, without remounting `SceneNode`, disposing the WebGL context, or rewriting scene config:

- Material shader uniforms
- Mesh position / rotation / scale
- Camera position / lookAt / rotation / perspective projection (`fov`, `near`, `far`)

Changes take effect on the next animation frame because setters mutate live Three.js objects in place.

## Non-goals

- No React control UI inside this package
- Not for raw-WebGL / `setJsModelUniform` (separate path)
- Not for lights, post-effects, or orbit-controls takeover (this pass)
- Peripheral mouse/key interactions stay under `peripheral/` — different concern

## ID conventions

| Concept     | Runtime identity (setters)       | Display label (`snapshot.*.name`)      | Source in scene config                |
| ----------- | -------------------------------- | -------------------------------------- | ------------------------------------- |
| Mesh        | `Object3D.name`                  | `userData.configName`                  | Mesh config `id` / optional `name`    |
| Material    | `material.name`                  | `userData.configName`                  | Material config `guid` / `name`       |
| Uniform key | Key on `ShaderMaterial.uniforms` | Parsed parameter key from `u_key_guid` | Typically `u_${parameterKey}_${guid}` |

Always prefer **`getParameterControlSnapshot()`** over guessing keys when the scene is running.

## Scene config: `parameterControls`

Optional on `SceneConfig`. One map per scene: **material id → uniform id → control entry**. Empty `{}` is valid. Uniform-only for now (mesh/camera controls are not configured here yet).

```ts
import { CONTROLLER_TYPE, type ParameterControlsConfig } from "art-os-package";

parameterControls?: ParameterControlsConfig;
// Record<materialId, Record<uniformId, ParameterControlConfig>>
```

- **material id** = material `guid` / snapshot `materials[].id`
- **uniform id** = full runtime uniform key / snapshot `uniforms[].key`

### `CONTROLLER_TYPE` (SCREAMING_SNAKE)

```ts
CONTROLLER_TYPE.COLOR; // "color"
CONTROLLER_TYPE.SLIDER; // "slider"
CONTROLLER_TYPE.ASSET_CONTROLLER; // "assetController"
```

Prefer `CONTROLLER_TYPE.*` when writing configs instead of raw strings.

### Entry shape

```ts
// Slider — one bounds entry per component (float=1, vec2=2, vec3=3, vec4=4)
{
  controllerType: CONTROLLER_TYPE.SLIDER,
  controllerConfig: {
    dimensions: Array<{ lowerBound: number; upperBound: number }>;
  };
}

// Color / asset — no controllerConfig yet
{ controllerType: CONTROLLER_TYPE.COLOR }
{ controllerType: CONTROLLER_TYPE.ASSET_CONTROLLER }
```

### Example

```ts
parameterControls: {
  [materialGuid]: {
    [`u_tint_${paramGuid}`]: {
      controllerType: CONTROLLER_TYPE.COLOR,
    },
    [`u_intensity_${paramGuid}`]: {
      controllerType: CONTROLLER_TYPE.SLIDER,
      controllerConfig: {
        dimensions: [{ lowerBound: 0, upperBound: 1 }],
      },
    },
    [`u_offset_${paramGuid}`]: {
      controllerType: CONTROLLER_TYPE.SLIDER,
      controllerConfig: {
        // vec4 → four sliders
        dimensions: [
          { lowerBound: -1, upperBound: 1 },
          { lowerBound: -1, upperBound: 1 },
          { lowerBound: -1, upperBound: 1 },
          { lowerBound: 0, upperBound: 1 },
        ],
      },
    },
  },
}
```

Render `controllerConfig.dimensions.length` sliders; index `0..n-1` maps to vector components `x/y/z/w` (or the float itself when length is 1).

### Merging with the live snapshot

1. Call `getParameterControlSnapshot()` for live values, labels, and `controlsConfig`.
2. For each uniform, use `uniform.controlsConfig` when present to pick the widget and bounds.
3. If `controlsConfig` is null, fall back to a default widget from `valueType`.
4. Apply changes with `setMaterialUniforms({ materialIds: [materialId] }, { [uniformKey]: nextValue })`.

## Lifecycle

1. Package constructs `InteractiveScene` → calls `registerParameterControlContext(scene, camera)`.
2. External UI may call setters / snapshot at any time after the scene exists.
3. On dispose → `deregisterParameterControlContext()`.

You normally **do not** call register/deregister yourself when using `SceneNode`. Manual registration is only for custom hosts that create an `InteractiveScene` without the stock path.

If a setter warns `no parameter-control scene registered`, the scene is not ready or already disposed.

## Public API

Import from `art-os-package`:

```ts
import {
  CONTROLLER_TYPE,
  setMaterialUniforms,
  setMeshTransform,
  setCameraParams,
  getParameterControlSnapshot,
  type ParameterControlSelector,
  type MeshTransformParams,
  type CameraParams,
  type ParameterControlSnapshot,
  type ParameterControlsConfig,
} from "art-os-package";
```

### `setMaterialUniforms(selector, data)`

```ts
setMaterialUniforms(
  { materialIds?: string[]; meshIds?: string[] },
  Record<string, unknown>, // uniformKey → value
): void
```

- Resolves targets by material id and/or mesh id (union of matches).
- Writes `material.uniforms[key].value = value` for each matched mesh that has that uniform.
- Warns and skips missing meshes / missing uniform keys.
- Values must match what Three.js expects for that uniform (number, `Vector2`/`3`/`4`, `Color`, etc.). For UI-driven floats/vecs, pass numbers or Three vector instances your app already uses.

**Back-compat:** `externalUpdate(selector, data)` is an alias of this function.

### `setMeshTransform(meshId, params)`

```ts
setMeshTransform(meshId: string, {
  position?: { x?: number; y?: number; z?: number };
  rotation?: { x?: number; y?: number; z?: number }; // radians
  scale?: { x?: number; y?: number; z?: number };
}): void
```

Partial updates allowed (only provided axes change).

### `setCameraParams(params)`

```ts
setCameraParams({
  position?: { x?: number; y?: number; z?: number };
  lookAt?: { x: number; y: number; z: number };
  rotation?: { x?: number; y?: number; z?: number }; // radians
  fov?: number;
  near?: number;
  far?: number;
}): void
```

- `fov` / `near` / `far` apply only on `PerspectiveCamera` and call `updateProjectionMatrix()`.
- Prefer either `lookAt` or `rotation` in one call to avoid fighting orientations.

### `getParameterControlSnapshot()`

```ts
type ParameterControlSnapshot = {
  meshes: {
    id: string; // use for setters (mesh Object3D.name / config guid)
    name: string; // display label from config (falls back to id)
    materialId: string | null;
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
    scale: { x: number; y: number; z: number };
  }[];
  materials: {
    id: string; // use for setters (material.name / config guid)
    name: string; // display label from config (falls back to id)
    uniforms: {
      key: string; // use for setters
      name: string; // display label (`u_param_guid` → `param`; defaults like `uTime` unchanged)
      valueType: string; // float | int | bool | vec2 | vec3 | vec4 | texture | other
      value: unknown; // plain numbers / {x,y[,z[,w]]}; texture → null
      controlsConfig: ParameterControlConfig | null; // from parameter `controlsConfig`; null if unset
    }[];
  }[];
  camera: {
    type: string;
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
    fov?: number;
    near?: number;
    far?: number;
  } | null;
};
```

Use this to populate the controller UI. Show `name` in labels; keep using `id` / `materialId` / uniform `key` for setter calls. Prefer `controlsConfig.controllerType` (and slider `dimensions` bounds) when present; otherwise fall back from `valueType`. Skip uniforms with `valueType: "texture"` (not editable via this API).

## Building an external controller (prompt checklist)

When generating UI code from this package:

1. **Discover** — On scene ready (or on a short interval), call `getParameterControlSnapshot()`.
2. **Map widgets**
   - Prefer `uniform.controlsConfig` when non-null (`CONTROLLER_TYPE.SLIDER` → one slider per `dimensions` entry, etc.)
   - Else infer from `valueType`: `float` / `int` → slider; `bool` → toggle; `vec2` / `vec3` / `vec4` → grouped XYZ(W)
   - Mesh / camera transforms → XYZ groups (rotation in radians; show degrees in UI if desired)
3. **Apply live** — On change, call the matching setter immediately. Do **not** remount the scene or patch config JSON for live tweaks.4. **Throttle continuous input** — For dragging sliders, call setters every frame or throttle (~16–32ms). Snapshot polling can be slower (e.g. 250–1000ms) if you only need to refresh labels.
5. **Identity** — Bind material uniform rows to `materials[].id` + `uniforms[].key`. Bind mesh rows to `meshes[].id`.

### Example: uniform slider

```ts
setMaterialUniforms({ materialIds: [materialId] }, { [uniformKey]: nextFloat });
```

### Example: continuous mesh drag

```ts
const onDrag = (x: number, y: number, z: number) => {
  setMeshTransform(meshId, { position: { x, y, z } });
};
```

### Example: camera dolly

```ts
setCameraParams({
  position: { z: distance },
  lookAt: { x: 0, y: 0, z: 0 },
});
```

## Relationship to scene config

Live control **does not** persist into the scene config file. Treat the controller as a runtime overlay:

- Config still defines initial materials, meshes, camera.
- Snapshot reflects current live state after mutations.
- If you need persistence, the host app should write values back to config separately.

## Minimal host wiring sketch

```ts
// After SceneNode / InteractiveScene is up:
const snap = getParameterControlSnapshot();
// build UI from snap.materials / snap.meshes / snap.camera

// On user input:
setMaterialUniforms({ materialIds: [id] }, { [key]: value });
setMeshTransform(meshId, { position: { x } });
setCameraParams({ fov: 45 });
```

## Quick reference

| Action                             | Call                                       |
| ---------------------------------- | ------------------------------------------ |
| Set uniforms by material or mesh   | `setMaterialUniforms`                      |
| Move / rotate / scale mesh         | `setMeshTransform`                         |
| Move / aim / reproject camera      | `setCameraParams`                          |
| List controllable targets + values | `getParameterControlSnapshot`              |
| Legacy uniform update              | `externalUpdate` (= `setMaterialUniforms`) |
