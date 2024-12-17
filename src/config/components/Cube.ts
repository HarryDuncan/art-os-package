import { BoxGeometry, Mesh } from "three";
import { CubeProps } from "./threeJsComponents.types";
import { DEFAULT_MATERIAL } from "../../config/material/materials.default";

export const Cube = ({
  id,
  size,
  position,
  material = DEFAULT_MATERIAL,
}: CubeProps & { id: string }) => {
  const cubeGeometry = new BoxGeometry(
    size?.x ?? 40,
    size?.y ?? 40,
    size?.z ?? 40
  );
  const cube = new Mesh(cubeGeometry, material);
  cube.name = id;
  const { x, y, z } = position;
  cube.position.set(x, y, z);
  return cube;
};
