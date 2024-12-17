import { Color, Vector3 } from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector";
import { MirrorProps } from "./threeJsComponents.types";
import { rotatePlaneToFaceCoordinate } from "../../utils/three-dimension-space/rotatePlane";

export const Mirror = ({
  id,
  geometry,
  position,
}: MirrorProps & { id: string }) => {
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
