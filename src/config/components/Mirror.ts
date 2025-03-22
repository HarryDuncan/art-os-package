import { Color, Vector3, Mesh } from "three";
import { MirrorProps } from "./threeJsComponents.types";
import { rotatePlaneToFaceCoordinate } from "../../utils/three-dimension-space/rotatePlane";

export const Mirror = async ({
  id,
  geometry,
  position,
}: MirrorProps & { id: string }) => {
  const { Reflector } = await import("three/examples/jsm/objects/Reflector.js");
  const mirror = new Reflector(geometry, {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: new Color(0x19191a),
  });
  mirror.name = id;
  mirror.position.set(position.x, position.y, position.z);
  const targetCoordinate = new Vector3(0, 0, 0);
  const newRotation = rotatePlaneToFaceCoordinate(position, targetCoordinate);
  mirror.rotation.set(newRotation.x, newRotation.y, newRotation.z);
  return mirror;
};

export const createMirror = async (
  width: number,
  height: number
): Promise<Mesh> => {
  const { Reflector } = await import("three/examples/jsm/objects/Reflector.js");
  const mirror = new Reflector(width, height);
  return mirror;
};
