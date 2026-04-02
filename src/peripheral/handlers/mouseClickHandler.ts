import { Raycaster, Vector2, Camera, Object3D } from "three";

const raycaster = new Raycaster();
const ndc = new Vector2();

export const mouseClickHandler = (
  event: MouseEvent,
  params: {
    camera: Camera;
    rendererHeight: number;
    rendererWidth: number;
    clickTargets: Object3D[];
  },
) => {
  const { camera, rendererHeight, rendererWidth, clickTargets } = params;
  if (!camera || !rendererHeight || !rendererWidth || !clickTargets.length) {
    return null;
  }

  ndc.set(
    (event.clientX / rendererWidth) * 2 - 1,
    -(event.clientY / rendererHeight) * 2 + 1,
  );

  raycaster.setFromCamera(ndc, camera);
  const intersections = raycaster.intersectObjects(clickTargets, false);

  if (intersections.length === 0) return null;

  return intersections[0].object;
};
