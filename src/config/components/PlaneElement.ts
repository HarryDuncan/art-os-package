import { Mesh, PlaneGeometry } from "three";
import { PlaneProps } from "./threeJsComponents.types";
import { DEFAULT_MATERIAL } from "../../config/material/materials.default";

export const PlaneElement = ({
  id,
  size,
  position,
  material = DEFAULT_MATERIAL,
}: PlaneProps & { id: string }) => {
  const planeGeometry = new PlaneGeometry(size?.x ?? 100, size?.y ?? 60);
  const plane = new Mesh(planeGeometry, material);
  plane.name = id;
  const { x, y, z } = position;
  plane.position.set(x, y, z);
  return plane;
};
