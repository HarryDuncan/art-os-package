import { Vector2, Vector3 } from "three";
import { PlaneElement } from "../PlaneElement";
import { ShaderBackgroundProps } from "../threeJsComponents.types";

const DEFAULT_SIZE = new Vector2(40, 40);
const DEFAULT_POSITION = new Vector3(0, 0, -5);

export const ShaderBackground = ({
  material,
  size = DEFAULT_SIZE,
  position = DEFAULT_POSITION,
}: ShaderBackgroundProps) => {
  const id = "background-shader";
  return PlaneElement({ id, size, position, material });
};
