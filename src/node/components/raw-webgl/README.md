# Raw WebGL plane meshes: editor implementation brief

This brief is for an agent working in the **art-os-2** repo. It describes how to author scene configs that the `webgl` engine in `art-os-package` renders as multiple planes, each with its own material and textures, in a single WebGL2 canvas. You don't need this package's source. Everything you need is exported from `art-os-package` and described below.

## 1. Goal and scope

Build editor UI in art-os-2 that creates, edits, and deletes **plane meshes** for scenes with `engine: "webgl"`, and writes them into `SceneConfig.meshComponentConfigs`.

In scope:
- Add, remove, reorder, and edit plane meshes: geometry type, draw mode, size, scale, position, rotation, material, and centering.
- Edit the scene camera (`cameraConfig`) used to frame the planes.
- Show live info and warnings: vertex count, invalid combinations, missing material.

Out of scope: see [Limitations](#10-limitations). Don't build UI for those features. The material shader graph editor already exists in art-os-2; reuse it for materials.

## 2. Imports

Use these consts everywhere. Never hardcode the string literals.

```ts
import {
  ENGINE,                          // { THREE: "three", WEBGL: "webgl" }
  MESH_TYPES,                      // { MESH: "MESH", POINTS: "POINTS", NONE: "NONE" }
  CUSTOM_BUFFER_GEOMETRY_TYPES,    // { EMPTY, DETAILED_PLANE, SIMPLE_PLANE }
  RAW_WEBGL_DEFAULTS,
  RAW_WEBGL_PLANE_GEOMETRY_TYPES,  // [SIMPLE_PLANE, DETAILED_PLANE]
  RAW_WEBGL_MESH_TYPES,            // [MESH, POINTS]
  CAMERA_TYPES,                    // { PERSPECTIVE_CAMERA: "perspectiveCamera", ORTHOGRAPHIC_CAMERA: "orthographicCamera" }
  DEFAULT_PERSPECTIVE,             // { fov: 45, aspect: 1, near: 1, far: 1000 }
  DEFAULT_ORTHOGRAPHIC,            // { frustumSize: 1 }
  ASSET_TYPES,
  ASSET_MAPPING_RELATIONSHIPS,     // TEXTURE: "texture", ...
  MATERIAL_TYPES,                  // BUILT_SHADER, ...
} from "art-os-package";

import type {
  SceneConfig,
  MeshComponentConfig,
  RawWebglPlaneMeshConfig,
  RawWebglConfig,
  RawWebglClearColor,
  CameraConfig,
  CameraType,
  PerspectiveCameraConfig,
  OrthographicCameraConfig,
  MaterialConfig,
  ParameterConfig,
  Asset,
  DetailedPlaneConfig,
  GeometryConfig,
  Position3d,
} from "art-os-package";
```

`RAW_WEBGL_DEFAULTS`:

```ts
{
  geometryType: "DETAILED_PLANE",
  meshType: "MESH",
  planeWidth: 128,
  planeHeight: 128,
  scale: 1,
  centerGeometryToOrigin: true,
  clearColor: [0, 0, 0, 0],
  legacyPlaneSegments: 128,          // legacy only, ignore in the editor
  legacyDrawMode: "POINTS",          // legacy only, ignore in the editor
  recommendedMaxVerticesPerMesh: 1_000_000,
}
```

## 3. Data model

The editor touches these parts of `SceneConfig`:

| Field | What it holds |
|---|---|
| `engine` | `ENGINE.WEBGL`. Plane meshes only render on this engine through this path. |
| `meshComponentConfigs[]` | The plane meshes (`RawWebglPlaneMeshConfig`). Array order is meaningful (see section 5). |
| `sceneMaterialConfigs[]` | Materials. A mesh points at one via `materialId === material.guid`. Only `MATERIAL_TYPES.BUILT_SHADER` materials render on `webgl`. |
| `meshTransforms[]` | Optional per-vertex attributes, targeted at meshes via `transformedMeshIds`. |
| `cameraConfig` | Shared camera for all planes. |
| `assets[]` | Texture images (`ASSET_TYPES.TEXTURE`), referenced by materials. |
| `rawWebglConfig.clearColor` | Canvas clear color, normalised RGBA `[r, g, b, a]` in 0..1. Default transparent. |

`rawWebglConfig.planeGeometryConfig` and `rawWebglConfig.drawMode` are **deprecated**. They only affect old scenes that have no plane meshes. Don't expose them in the editor.

The mesh type:

```ts
type RawWebglPlaneMeshConfig = {
  guid: string;                       // unique; the id everything else references
  id: string;                         // keep equal to guid
  name?: string;                      // display name
  meshType: string;                   // MESH_TYPES.MESH | MESH_TYPES.POINTS
  geometryType: string;               // CUSTOM_BUFFER_GEOMETRY_TYPES.SIMPLE_PLANE | DETAILED_PLANE
  customGeometryConfig: { width: number; height: number };
  geometryConfig?: { scale?: number; centerMesh?: boolean };
  centerGeometryToOrigin?: boolean;
  materialId?: string;                // sceneMaterialConfigs[].guid
  position?: { x?: number; y?: number; z?: number }; // world units
  rotation?: { x?: number; y?: number; z?: number }; // degrees, applied X then Y then Z
};
```

It is a narrowed `MeshComponentConfig`, so it is assignable into `meshComponentConfigs`. When you read the array back, narrow with:

```ts
const isPlaneMesh = (m: MeshComponentConfig) =>
  m.meshType !== MESH_TYPES.NONE &&
  RAW_WEBGL_PLANE_GEOMETRY_TYPES.includes(m.geometryType ?? "");
```

The runtime uses this exact rule. Meshes that fail it are ignored on `webgl`; list them as "not rendered on WebGL" instead of hiding them.

## 4. Field reference

| Field | Type | Default | Allowed / validation | Editor control |
|---|---|---|---|---|
| `guid` / `id` | string | `crypto.randomUUID()` | Required, unique in `meshComponentConfigs` | Hidden |
| `name` | string | `"Plane N"` | Optional | Text input |
| `geometryType` | string | `RAW_WEBGL_DEFAULTS.geometryType` | One of `RAW_WEBGL_PLANE_GEOMETRY_TYPES` | Select ("Simple plane", "Detailed plane") |
| `meshType` | string | `RAW_WEBGL_DEFAULTS.meshType` | One of `RAW_WEBGL_MESH_TYPES` | Segmented toggle ("Solid", "Points") |
| `customGeometryConfig.width` | number | `RAW_WEBGL_DEFAULTS.planeWidth` | Simple: > 0. Detailed: integer >= 2 | Number input |
| `customGeometryConfig.height` | number | `RAW_WEBGL_DEFAULTS.planeHeight` | Simple: > 0. Detailed: integer >= 2 | Number input |
| `geometryConfig.scale` | number | `RAW_WEBGL_DEFAULTS.scale` | > 0 | Number input / slider |
| `centerGeometryToOrigin` | boolean | `RAW_WEBGL_DEFAULTS.centerGeometryToOrigin` | | Checkbox ("Centre on position") |
| `geometryConfig.centerMesh` | boolean | unset | Don't expose; see centering rules | |
| `materialId` | string | unset | Must equal a `sceneMaterialConfigs[].guid` with `materialType === MATERIAL_TYPES.BUILT_SHADER` | Material picker |
| `position` | vec3 | `{0, 0, 0}` | Finite numbers | Vec3 input |
| `rotation` | vec3 (degrees) | `{0, 0, 0}` | Finite numbers | Vec3 input |

What `width` and `height` mean depends on the geometry type:
- **`SIMPLE_PLANE`**: the plane's size in world units, multiplied by `scale`. Always 4 vertices.
- **`DETAILED_PLANE`**: the number of vertices along each axis. Vertices are `scale` world units apart, so the plane spans `(width - 1) * scale` by `(height - 1) * scale` world units. For an image, set width and height to the image's pixel size to get one vertex per pixel.

## 5. Rules the UI must respect

1. **Points need a detailed plane.** `POINTS` with `SIMPLE_PLANE` draws 4 dots. Disable "Points" when the geometry is "Simple plane". If an existing config has that combination, show a warning and don't silently change it.
2. **Vertex budget.** A detailed plane has `width * height` vertices. Show the count live next to the size inputs. Warn above `RAW_WEBGL_DEFAULTS.recommendedMaxVerticesPerMesh`, and also show a total across all planes. Don't hard-block.
3. **Textures belong to the material, not the mesh.** Two planes that should show different images need two different materials. Two planes can share one material: same shader, same textures, different position, rotation, and size. If the user picks an image "for this plane", create or duplicate a material for it.
4. **Missing material = not rendered.** A mesh with no `materialId`, or one that matches no `BUILT_SHADER` material, is skipped at runtime. Show this as an error on the mesh. When a material is deleted, clear `materialId` on every mesh that used it and surface the error.
5. **Centering.** The plane is centered on its own origin if `centerGeometryToOrigin` is true, or if `geometryConfig.centerMesh` is true, or if `geometryConfig` is absent entirely. Otherwise a detailed plane's bottom-left corner sits at `position`. `position` then moves that origin. Simple planes are always centered. To keep this predictable, always write `geometryConfig: { scale }` (no `centerMesh`) and drive centering only from `centerGeometryToOrigin`.
6. **Mesh transforms target by guid.** `meshTransforms[].transformedMeshIds` lists the mesh `guid`s the transform applies to. An empty or missing list applies it to every plane. When a mesh is deleted, remove its guid from every `transformedMeshIds`. Don't leave a list empty by accident, because that turns the transform on for all planes.
7. **Draw order.** Opaque planes (material `blendingConfig.transparent` false, the default) draw first, grouped by material; the depth buffer resolves which is in front. Transparent planes draw after, in `meshComponentConfigs` array order, so later entries composite on top. Offer reordering (drag handle), and label it "draw order (transparent planes)".
8. **IDs.** `id` and `guid` should be equal and never change after creation.

## 6. Camera

All planes share `SceneConfig.cameraConfig`. If it's missing, planes are drawn in raw clip space (-1..1 fills the canvas), which is almost never what you want. Always create a camera when the first plane is added.

```ts
type CameraConfig = {
  cameraType: CameraType;   // CAMERA_TYPES.PERSPECTIVE_CAMERA | CAMERA_TYPES.ORTHOGRAPHIC_CAMERA
  position: { x?: number; y?: number; z?: number };
  lookAt?: { x: number; y: number; z: number }; // omitted: looks down -Z
  perspectiveCameraConfig?: { fov: number; aspect: number; near: number; far: number };
  orthographicCameraConfig?: { frustumSize: number };
};
```

- **Perspective**: `fov` is vertical, in degrees. `aspect` is ignored at runtime (the canvas aspect is used). To frame a plane of height `H` exactly at distance `d` in front of the camera: `d = (H / 2) / tan(fov / 2)`. Make sure `far > d` and `near < d`. Defaults come from `DEFAULT_PERSPECTIVE`.
- **Orthographic**: the visible area is a **square** `frustumSize x frustumSize` world units centred on the camera. It isn't corrected for the canvas aspect, so content stretches on non-square canvases; the three.js engine behaves the same way. Near/far are fixed at -1000..1000. To fit a plane of height `H`, set `frustumSize = H`.
- Suggested default when adding the first plane of size `W x H` (world units): perspective, `position: { x: 0, y: 0, z: (H / 2) / Math.tan((45 * Math.PI) / 360) * 1.1 }`, `lookAt: { x: 0, y: 0, z: 0 }`, `perspectiveCameraConfig: { ...DEFAULT_PERSPECTIVE, far: Math.max(1000, z * 2) }`, with the plane centered at the origin.

## 7. Textures and points

**Mapping an image onto a plane:**
1. Add the image to `assets[]` with `assetType: ASSET_TYPES.TEXTURE`. Images load as GPU textures. Any size works; power-of-two isn't required.
2. In the plane's material (a `BUILT_SHADER` material from the existing material editor), add a uniform `ParameterConfig` with `valueType: "SAMPLER2D"`, `isAssetMapped: true`, and `assetMappingConfig: { assetId: <asset guid>, relationship: ASSET_MAPPING_RELATIONSHIPS.TEXTURE }`.
3. The material's fragment graph samples that uniform with the `vUv` varying, the same as the three.js engine.

UVs run 0..1 across every plane, bottom-left (0,0) to top-right (1,1), with the image right side up. On a solid plane (`MESH`) the image stretches across the whole surface.

**Points mode (`POINTS` + `DETAILED_PLANE`):** each vertex becomes one point and carries the UV of its grid cell. Sampling the texture with `vUv` therefore colours each point with the image's texel at that position. With `width`/`height` equal to the image's pixel size, you get one point per pixel. Point size comes from the material graph's point-size output (`gl_PointSize`, the `pointSize` shader variable). Without one, the size is undefined in WebGL; most GPUs draw 1-pixel points. Warn when a `POINTS` plane's material has no point-size output.

One image used by several materials is uploaded to the GPU once. The number of distinct textures per scene is capped by the GPU, usually at least 32 units including live model canvases. Warn above 16 distinct textures.

Video textures aren't supported on this engine yet (section 10). Disable video assets in the material picker when `engine === ENGINE.WEBGL`.

## 8. Examples

Material bodies are abbreviated as `/* ... */`. They come from the existing material editor (`shaderEffectConfigs`, `schemas`, and so on) and aren't specific to planes. Everything else is complete. Write `configVersion` from the exported `CURRENT_SCENE_CONFIG_VERSION` (currently `2`) rather than the literal.

### a) One textured simple plane

```json
{
  "id": "scene-simple",
  "engine": "webgl",
  "configVersion": 2,
  "assets": [
    { "guid": "img-1", "name": "poster", "assetType": "TEXTURE", "fileName": "poster.png", "path": "/assets/poster.png" }
  ],
  "cameraConfig": {
    "cameraType": "perspectiveCamera",
    "position": { "x": 0, "y": 0, "z": 1330 },
    "lookAt": { "x": 0, "y": 0, "z": 0 },
    "perspectiveCameraConfig": { "fov": 45, "aspect": 1, "near": 1, "far": 3000 }
  },
  "meshComponentConfigs": [
    {
      "guid": "plane-1",
      "id": "plane-1",
      "name": "Poster",
      "meshType": "MESH",
      "geometryType": "SIMPLE_PLANE",
      "customGeometryConfig": { "width": 1600, "height": 1000 },
      "geometryConfig": { "scale": 1 },
      "centerGeometryToOrigin": true,
      "materialId": "mat-poster",
      "position": { "x": 0, "y": 0, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 }
    }
  ],
  "sceneMaterialConfigs": [
    {
      "guid": "mat-poster",
      "name": "Poster",
      "materialType": "BUILT_SHADER",
      "materialProps": {},
      "parameterConfigs": [
        {
          "guid": "p-map",
          "key": "uMap",
          "parameterType": "uniform",
          "valueType": "SAMPLER2D",
          "isAssetMapped": true,
          "assetMappingConfig": { "assetId": "img-1", "relationship": "texture" }
        }
        /* ..., vUv varying, other parameters from the material editor */
      ]
      /* shaderEffectConfigs, schemas, ... */
    }
  ],
  "peripheralInteractions": [],
  "rawWebglConfig": { "clearColor": [0, 0, 0, 0] },
  "sceneProperties": { "position": "absolute", "viewWidth": "100vw", "viewHeight": "100vh", "background": { "type": "color", "color": "#000000" } }
}
```

### b) A detailed plane drawn as points, one point per pixel of a 256x256 image

```json
{
  "guid": "plane-points",
  "id": "plane-points",
  "name": "Point cloud",
  "meshType": "POINTS",
  "geometryType": "DETAILED_PLANE",
  "customGeometryConfig": { "width": 256, "height": 256 },
  "geometryConfig": { "scale": 2 },
  "centerGeometryToOrigin": true,
  "materialId": "mat-points",
  "position": { "x": 0, "y": 0, "z": 0 },
  "rotation": { "x": 0, "y": 0, "z": 0 }
}
```

This plane spans `255 * 2 = 510` world units and has 65,536 vertices. `mat-points` samples its texture with `vUv` and writes a point size.

### c) Two planes with different images and a camera

```json
{
  "engine": "webgl",
  "cameraConfig": {
    "cameraType": "perspectiveCamera",
    "position": { "x": 0, "y": 0, "z": 900 },
    "lookAt": { "x": 0, "y": 0, "z": 0 },
    "perspectiveCameraConfig": { "fov": 45, "aspect": 1, "near": 1, "far": 3000 }
  },
  "assets": [
    { "guid": "img-a", "name": "a", "assetType": "TEXTURE", "fileName": "a.jpg", "path": "/assets/a.jpg" },
    { "guid": "img-b", "name": "b", "assetType": "TEXTURE", "fileName": "b.jpg", "path": "/assets/b.jpg" }
  ],
  "meshComponentConfigs": [
    {
      "guid": "plane-left", "id": "plane-left", "name": "Left",
      "meshType": "MESH", "geometryType": "DETAILED_PLANE",
      "customGeometryConfig": { "width": 64, "height": 64 },
      "geometryConfig": { "scale": 6 },
      "centerGeometryToOrigin": true,
      "materialId": "mat-a",
      "position": { "x": -220, "y": 0, "z": 0 },
      "rotation": { "x": 0, "y": 15, "z": 0 }
    },
    {
      "guid": "plane-right", "id": "plane-right", "name": "Right",
      "meshType": "POINTS", "geometryType": "DETAILED_PLANE",
      "customGeometryConfig": { "width": 200, "height": 200 },
      "geometryConfig": { "scale": 2 },
      "centerGeometryToOrigin": true,
      "materialId": "mat-b",
      "position": { "x": 220, "y": 0, "z": 0 },
      "rotation": { "x": 0, "y": -15, "z": 0 }
    }
  ],
  "sceneMaterialConfigs": [
    { "guid": "mat-a", "name": "A", "materialType": "BUILT_SHADER", "materialProps": {},
      "parameterConfigs": [
        { "guid": "pa", "key": "uMap", "parameterType": "uniform", "valueType": "SAMPLER2D",
          "isAssetMapped": true, "assetMappingConfig": { "assetId": "img-a", "relationship": "texture" } }
      ] /* , ... */ },
    { "guid": "mat-b", "name": "B", "materialType": "BUILT_SHADER", "materialProps": {},
      "parameterConfigs": [
        { "guid": "pb", "key": "uMap", "parameterType": "uniform", "valueType": "SAMPLER2D",
          "isAssetMapped": true, "assetMappingConfig": { "assetId": "img-b", "relationship": "texture" } }
      ] /* , ... */ }
  ],
  "meshTransforms": [
    {
      "guid": "t-random",
      "transformedMeshIds": ["plane-right"],
      "values": { "random": { "guid": "v1", "type": "random_value", "value": 0 } },
      "inputMapping": {},
      "outputMapping": {}
    }
  ]
}
```

`meshTransforms` gives only `plane-right` an `a_random` attribute (one random float per vertex). Both planes may still use the same uniform key (`uMap`), because each material has its own program.

## 9. Helpers to build in art-os-2

```ts
// New plane seeded from RAW_WEBGL_DEFAULTS.
createDefaultPlaneMesh(
  geometryType: string = RAW_WEBGL_DEFAULTS.geometryType,
  overrides?: Partial<RawWebglPlaneMeshConfig>,
): RawWebglPlaneMeshConfig;

type PlaneMeshIssue = { level: "error" | "warning"; field?: string; message: string };

// Encodes the rules in sections 4 and 5. No side effects.
validatePlaneMesh(mesh: RawWebglPlaneMeshConfig, scene: SceneConfig): PlaneMeshIssue[];

// width * height for DETAILED_PLANE, 4 for SIMPLE_PLANE.
getPlaneVertexCount(mesh: RawWebglPlaneMeshConfig): number;

// Removes the mesh, and its guid from every meshTransforms[].transformedMeshIds.
removePlaneMesh(scene: SceneConfig, meshGuid: string): SceneConfig;

// Clears materialId on meshes that referenced the deleted material.
onMaterialDeleted(scene: SceneConfig, materialGuid: string): SceneConfig;

// Perspective camera framing a W x H plane at the origin (section 6).
createDefaultCameraForPlane(width: number, height: number): CameraConfig;
```

Keep these pure, returning new objects, and unit-test them.

## 10. Limitations

The `webgl` engine doesn't support the following. Don't build UI for them on `webgl` scenes; disable or hide them instead:
- geometry other than the two plane types: model files (OBJ/GLB/GLTF), `EMPTY` geometry, groups (`groupId`), and `multipleInstanceConfig`
- video and video-stream textures
- `viewWidth` / `viewHeight` / `position` scene properties; the canvas is always fullscreen
- interactions, raycasting, orbit controls, and camera animation or timelines (the camera is static)
- morph and quad mesh transforms; supported `meshTransforms` value types are `indexed`, `random_value`, `single_random_value`, `randomized_binary`, and `single_value`
- editing a scene while it's running: any change to the scene config rebuilds the whole canvas

## 11. Acceptance checklist

- [ ] "Add plane" appends a `RawWebglPlaneMeshConfig` built by `createDefaultPlaneMesh` to `meshComponentConfigs`, and `validatePlaneMesh` returns no errors for it once a material is assigned.
- [ ] Adding the first plane to a scene without `cameraConfig` also creates a camera that frames it.
- [ ] Every geometry type, mesh type, and camera type value is written from the imported consts. A grep of the editor code for `"DETAILED_PLANE"`, `"POINTS"`, or `"perspectiveCamera"` string literals finds nothing.
- [ ] "Points" is disabled for simple planes, and a pre-existing simple-plane + points config shows a warning.
- [ ] The vertex count updates live, and the warning appears above `recommendedMaxVerticesPerMesh`.
- [ ] Deleting a material clears `materialId` on the meshes that used it, and those meshes show an error.
- [ ] Deleting a mesh removes its guid from all `transformedMeshIds`.
- [ ] Two planes with two materials and two texture assets render side by side with different images in `SceneNode` with `engine: "webgl"`.
- [ ] Reordering transparent planes changes which one composites on top.
- [ ] Exported scene JSON round-trips: load, save, load gives an identical config.
