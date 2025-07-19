import { Mesh, MeshPhongMaterial, PlaneGeometry } from "three";
import { PlaneProps } from "./threeJsComponents.types";

export const PlaneElement = ({
  id,
  size,
  position,
  material = new MeshPhongMaterial({
    specular: 0x111111,
    shininess: 250,
  }),
}: PlaneProps & { id: string }) => {
  const planeGeometry = new PlaneGeometry(size?.x ?? 100, size?.y ?? 60);
  const plane = new Mesh(planeGeometry, material);
  plane.name = id;
  const { x, y, z } = position;
  plane.position.set(x, y, z);
  return plane;
};
