import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";
import { CubeProps } from "./threeJsComponents.types";

export const Cube = ({
  id,
  size,
  position,
  material = new MeshPhongMaterial({
    specular: 0x111111,
    shininess: 250,
  }),
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
