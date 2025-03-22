import { Object3D } from "three";
import {
  DEFAULT_ISOLATION,
  DEFAULT_MARCHING_CUBES_SCALE,
  DEFAULT_RESOLUTION,
} from "./marchingCubes.constants";
import { MarchingCubesProps } from "../threeJsComponents.types";
import { DEFAULT_MATERIAL } from "../../../config/material/materials.default";

export const createMarchingCubes = async (
  resolution: number,
  isolation: number
): Promise<Object3D> => {
  const { MarchingCubes } = await import(
    "three/examples/jsm/objects/MarchingCubes.js"
  );
  const marchingCubes = new MarchingCubes(resolution, isolation);
  return marchingCubes;
};

export const MarchingCubesElement = ({
  id,
  resolution = DEFAULT_RESOLUTION,
  material = DEFAULT_MATERIAL,
  isolation = DEFAULT_ISOLATION,
  scale = DEFAULT_MARCHING_CUBES_SCALE,
}: MarchingCubesProps & { id: string }) => {
  return createMarchingCubes(resolution, isolation).then(
    (marchingCubeEffect) => {
      marchingCubeEffect.position.set(0, 0, 0);
      marchingCubeEffect.scale.set(scale, scale, scale);
      marchingCubeEffect.isolation = isolation;
      marchingCubeEffect.enableUvs = false;
      marchingCubeEffect.enableColors = false;
      marchingCubeEffect.name = `marching-cubes-${id}`;
      return marchingCubeEffect;
    }
  );
};
