import { Material, Mesh, SphereGeometry, Vector3 } from "three";
import { SphericalBackgroundProps } from "./threeJsComponents.types";
import { DEFAULT_ROTATION } from "../../utils/three-dimension-space/threeDSpace.constants";
import { DEFAULT_MATERIAL } from "../../config/material/materials.default";

export const SphericalBackground = ({
  id,
  position,
  radius,
  rotation = DEFAULT_ROTATION,
  material = DEFAULT_MATERIAL,
}: SphericalBackgroundProps & { id: string }) => {
  const sphereGeometry = new SphereGeometry(radius, 32, 16);
  const sphere = new Mesh(sphereGeometry, material);
  sphere.name = id;
  const { x, y, z } = position;
  sphere.position.set(x, y, z);
  setRotation(sphere, rotation);
  return sphere;
};

const setRotation = (
  object: Mesh<SphereGeometry, Material>,
  rotation: Vector3
) => {
  const { x, y, z } = rotation;
  object.rotation.set(x, y, z);
};
