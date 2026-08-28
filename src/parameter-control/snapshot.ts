import {
  Color,
  Material,
  Object3D,
  PerspectiveCamera,
  Texture,
  Vector2,
  Vector3,
  Vector4,
} from "three";
import { buildMaterialMeshMap } from "./helpers/buildMaterialMeshMap";
import {
  getRegisteredParameterControlCamera,
  getRegisteredParameterControlScene,
} from "./register";
import {
  MaterialSnapshot,
  MeshSnapshot,
  ParameterControlSnapshot,
  UniformSnapshot,
} from "./types";

const toPosition3d = (v: { x: number; y: number; z: number }) => ({
  x: v.x,
  y: v.y,
  z: v.z,
});

const getMaterialName = (object: Object3D): string | null => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const material = (object as any).material as Material | Material[] | undefined;
  if (!material) return null;
  if (Array.isArray(material)) {
    return material[0]?.name || null;
  }
  return material.name || null;
};

const getConfigName = (
  userData: Record<string, unknown> | undefined,
  fallback: string,
): string => {
  const configName = userData?.configName;
  return typeof configName === "string" && configName.length > 0
    ? configName
    : fallback;
};

const getMaterialConfigName = (object: Object3D, fallback: string): string => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const material = (object as any).material as Material | Material[] | undefined;
  if (!material) return fallback;
  const primary = Array.isArray(material) ? material[0] : material;
  return getConfigName(primary?.userData, fallback);
};

const classifyUniformValue = (
  value: unknown,
): { valueType: string; value: unknown } => {
  if (typeof value === "number") {
    return {
      valueType: Number.isInteger(value) ? "int" : "float",
      value,
    };
  }
  if (typeof value === "boolean") {
    return { valueType: "bool", value };
  }
  if (value instanceof Vector2) {
    return { valueType: "vec2", value: { x: value.x, y: value.y } };
  }
  if (value instanceof Vector3) {
    return {
      valueType: "vec3",
      value: { x: value.x, y: value.y, z: value.z },
    };
  }
  if (value instanceof Vector4) {
    return {
      valueType: "vec4",
      value: { x: value.x, y: value.y, z: value.z, w: value.w },
    };
  }
  if (value instanceof Color) {
    return {
      valueType: "vec3",
      value: { x: value.r, y: value.g, z: value.b },
    };
  }
  if (value instanceof Texture) {
    return { valueType: "texture", value: null };
  }
  if (Array.isArray(value)) {
    return { valueType: "other", value: [...value] };
  }
  return { valueType: "other", value: null };
};

/** `u_parameterKey_guid` → `parameterKey`; defaults like `uTime` stay as-is. */
const uniformDisplayName = (key: string): string => {
  const match = key.match(/^[uvac]_(.+)_(.+)$/);
  return match?.[1] ?? key;
};

const collectUniformSnapshots = (object: Object3D): UniformSnapshot[] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uniforms = (object as any).material?.uniforms as
    | Record<string, { value: unknown }>
    | undefined;
  if (!uniforms) return [];

  return Object.entries(uniforms).map(([key, uniform]) => {
    const { valueType, value } = classifyUniformValue(uniform?.value);
    return { key, name: uniformDisplayName(key), valueType, value };
  });
};

export const getParameterControlSnapshot = (): ParameterControlSnapshot => {
  const scene = getRegisteredParameterControlScene();
  const camera = getRegisteredParameterControlCamera();

  if (!scene) {
    return { meshes: [], materials: [], camera: null };
  }

  const meshes: MeshSnapshot[] = [];
  scene.traverse((child) => {
    if (!child.name) return;
    // Only include objects that look like meshes (have a material)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(child as any).material) return;
    meshes.push({
      id: child.name,
      name: getConfigName(child.userData, child.name),
      materialId: getMaterialName(child),
      position: toPosition3d(child.position),
      rotation: toPosition3d(child.rotation),
      scale: toPosition3d(child.scale),
    });
  });

  const materialMeshMap = buildMaterialMeshMap(scene);
  const materials: MaterialSnapshot[] = Object.entries(materialMeshMap).map(
    ([id, objects]) => ({
      id,
      name: objects[0] ? getMaterialConfigName(objects[0], id) : id,
      uniforms: objects[0] ? collectUniformSnapshots(objects[0]) : [],
    }),
  );

  let cameraSnapshot: ParameterControlSnapshot["camera"] = null;
  if (camera) {
    cameraSnapshot = {
      type: camera.type,
      position: toPosition3d(camera.position),
      rotation: toPosition3d(camera.rotation),
    };
    if (camera instanceof PerspectiveCamera) {
      cameraSnapshot.fov = camera.fov;
      cameraSnapshot.near = camera.near;
      cameraSnapshot.far = camera.far;
    }
  }

  return { meshes, materials, camera: cameraSnapshot };
};
