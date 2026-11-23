import { Object3D } from "three";
import { Position3d } from "../types/position.types";
import { getRegisteredParameterControlScene } from "./register";
import { MeshEditDelta } from "./types";

type Baseline = { position: Position3d; rotation: Position3d };

// Keyed by mesh name (the mesh config id). Only meshes the user has moved via
// parameter control appear here; animated meshes are never baked into config.
const baselines = new Map<string, Baseline>();

const xyz = (v: { x: number; y: number; z: number }): Position3d => ({
  x: v.x,
  y: v.y,
  z: v.z,
});

/** Record the mesh's transform before its first user edit. */
export const markMeshEdited = (mesh: Object3D): void => {
  if (!mesh.name || baselines.has(mesh.name)) return;
  baselines.set(mesh.name, {
    position: xyz(mesh.position),
    rotation: xyz(mesh.rotation),
  });
};

/** Live transform minus the pre-edit baseline, per edited mesh id. */
export const getMeshEditDeltas = (): Record<string, MeshEditDelta> => {
  const scene = getRegisteredParameterControlScene();
  const deltas: Record<string, MeshEditDelta> = {};
  if (!scene) return deltas;

  baselines.forEach((baseline, meshId) => {
    const mesh = scene.getObjectByName(meshId);
    if (!mesh) return;
    deltas[meshId] = {
      position: {
        x: mesh.position.x - baseline.position.x,
        y: mesh.position.y - baseline.position.y,
        z: mesh.position.z - baseline.position.z,
      },
      rotation: {
        x: mesh.rotation.x - baseline.rotation.x,
        y: mesh.rotation.y - baseline.rotation.y,
        z: mesh.rotation.z - baseline.rotation.z,
      },
    };
  });
  return deltas;
};

/** Forget all edits, e.g. after they were saved into the scene config. */
export const resetMeshEdits = (): void => {
  baselines.clear();
};
