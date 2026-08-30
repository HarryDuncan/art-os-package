import {
  Camera,
  Color,
  CylinderGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Plane,
  Raycaster,
  Scene,
  SphereGeometry,
  Vector2,
  Vector3,
} from "three";
import { OrbitControl } from "../types";
import { findSelectableLightUniforms } from "./findSelectableLightUniforms";
import {
  clearLightUniformSelectableOverrides,
  setLightSelectableChangeListener,
} from "./lightSelectable";
import { setMaterialUniforms } from "./updateUniforms";

const HANDLE_USER_DATA_KEY = "lightUniformHandle";
const PART_USER_DATA_KEY = "lightUniformPart";
const SPHERE_RADIUS = 0.18;
const AXIS_LENGTH = 0.85;
const AXIS_RADIUS = 0.045;

type DragMode = "free" | "x" | "y" | "z";

type LightHandleUserData = {
  [HANDLE_USER_DATA_KEY]: true;
  materialId: string;
  uniformKey: string;
};

type LightPartUserData = {
  [PART_USER_DATA_KEY]: true;
  dragMode: DragMode;
};

type LightInteractionHost = Scene & {
  camera: Camera;
  orbitControls: OrbitControl | null;
};

let activeHost: LightInteractionHost | null = null;
const gizmos: Group[] = [];
let attached = false;

const raycaster = new Raycaster();
const ndc = new Vector2();
const dragPlane = new Plane();
const planeHit = new Vector3();
const cameraDir = new Vector3();
const axisDir = new Vector3();
const axisOrigin = new Vector3();
const projected = new Vector3();

let draggingGizmo: Group | null = null;
let dragMode: DragMode = "free";
let orbitWasEnabled: boolean | undefined;

const AXIS_COLORS = {
  x: new Color(0xe74c3c),
  y: new Color(0x2ecc71),
  z: new Color(0x3498db),
};

const isLightHandleRoot = (obj: Object3D | null): obj is Group =>
  !!obj && obj.userData?.[HANDLE_USER_DATA_KEY] === true;

const findHandleRoot = (obj: Object3D): Group | null => {
  let current: Object3D | null = obj;
  while (current) {
    if (isLightHandleRoot(current)) return current as Group;
    current = current.parent;
  }
  return null;
};

const getDomElement = (): HTMLElement | null => {
  const controls = activeHost?.orbitControls;
  if (controls && "domElement" in controls) {
    return (controls as { domElement: HTMLElement }).domElement;
  }
  return null;
};

const disposeObject = (object: Object3D) => {
  object.traverse((child) => {
    if (child instanceof Mesh) {
      child.geometry.dispose();
      if (Array.isArray(child.material)) {
        child.material.forEach((m) => m.dispose());
      } else {
        child.material.dispose();
      }
    }
  });
};

const clearHandles = () => {
  if (!activeHost) return;
  for (const gizmo of gizmos) {
    activeHost.remove(gizmo);
    disposeObject(gizmo);
  }
  gizmos.length = 0;
};

const makeAxisMesh = (axis: "x" | "y" | "z"): Mesh => {
  const geometry = new CylinderGeometry(AXIS_RADIUS, AXIS_RADIUS, AXIS_LENGTH, 10);
  const material = new MeshBasicMaterial({
    color: AXIS_COLORS[axis],
    depthTest: false,
    transparent: true,
    opacity: 0.95,
  });
  const mesh = new Mesh(geometry, material);
  mesh.renderOrder = 999;
  mesh.frustumCulled = false;

  // Cylinder default is Y-up; reorient for X/Z
  if (axis === "x") {
    mesh.rotation.z = -Math.PI / 2;
    mesh.position.x = AXIS_LENGTH / 2;
  } else if (axis === "y") {
    mesh.position.y = AXIS_LENGTH / 2;
  } else {
    mesh.rotation.x = Math.PI / 2;
    mesh.position.z = AXIS_LENGTH / 2;
  }

  const partData: LightPartUserData = {
    [PART_USER_DATA_KEY]: true,
    dragMode: axis,
  };
  mesh.userData = partData;
  return mesh;
};

const createGizmo = (materialId: string, uniformKey: string): Group => {
  const group = new Group();
  group.frustumCulled = false;
  group.renderOrder = 999;

  const sphere = new Mesh(
    new SphereGeometry(SPHERE_RADIUS, 20, 20),
    new MeshBasicMaterial({
      color: 0xf1c40f,
      depthTest: false,
      transparent: true,
      opacity: 0.95,
    }),
  );
  sphere.renderOrder = 1000;
  sphere.frustumCulled = false;
  sphere.userData = {
    [PART_USER_DATA_KEY]: true,
    dragMode: "free",
  } satisfies LightPartUserData;

  group.add(sphere);
  group.add(makeAxisMesh("x"));
  group.add(makeAxisMesh("y"));
  group.add(makeAxisMesh("z"));

  const handleData: LightHandleUserData = {
    [HANDLE_USER_DATA_KEY]: true,
    materialId,
    uniformKey,
  };
  group.userData = handleData;
  return group;
};

const syncHandles = () => {
  if (!activeHost) return;
  clearHandles();

  const targets = findSelectableLightUniforms(activeHost);
  for (const target of targets) {
    const gizmo = createGizmo(target.materialId, target.uniformKey);
    gizmo.position.copy(target.position);
    activeHost.add(gizmo);
    gizmos.push(gizmo);
  }
};

const setPointerNdc = (event: PointerEvent, element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  ndc.set(x, y);
};

const setupDragPlane = (origin: Vector3, mode: DragMode) => {
  if (!activeHost) return;
  activeHost.camera.getWorldDirection(cameraDir);

  if (mode === "free") {
    dragPlane.setFromNormalAndCoplanarPoint(cameraDir.clone().negate(), origin);
    return;
  }

  // Plane containing the chosen axis and facing the camera as much as possible
  if (mode === "x") axisDir.set(1, 0, 0);
  else if (mode === "y") axisDir.set(0, 1, 0);
  else axisDir.set(0, 0, 1);

  const planeNormal = cameraDir.clone().cross(axisDir);
  if (planeNormal.lengthSq() < 1e-8) {
    // Axis nearly parallel to view — fall back to camera plane
    dragPlane.setFromNormalAndCoplanarPoint(cameraDir.clone().negate(), origin);
    return;
  }
  planeNormal.normalize();
  dragPlane.setFromNormalAndCoplanarPoint(planeNormal, origin);
};

const applyAxisConstraint = (hit: Vector3, origin: Vector3, mode: DragMode) => {
  if (mode === "free") {
    projected.copy(hit);
    return projected;
  }
  if (mode === "x") axisDir.set(1, 0, 0);
  else if (mode === "y") axisDir.set(0, 1, 0);
  else axisDir.set(0, 0, 1);

  const t = hit.clone().sub(origin).dot(axisDir);
  projected.copy(origin).addScaledVector(axisDir, t);
  return projected;
};

const writeUniformFromGizmo = (gizmo: Group) => {
  const { materialId, uniformKey } = gizmo.userData as LightHandleUserData;
  setMaterialUniforms(
    { materialIds: [materialId] },
    { [uniformKey]: gizmo.position.clone() },
  );
};

const onPointerDown = (event: PointerEvent) => {
  if (!activeHost || event.button !== 0) return;
  const dom = getDomElement();
  if (!dom) return;

  setPointerNdc(event, dom);
  raycaster.setFromCamera(ndc, activeHost.camera);
  const hits = raycaster.intersectObjects(gizmos, true);
  if (!hits.length) return;

  const hitObj = hits[0].object;
  const gizmo = findHandleRoot(hitObj);
  if (!gizmo) return;

  const part = hitObj.userData as Partial<LightPartUserData>;
  dragMode =
    part[PART_USER_DATA_KEY] && part.dragMode ? part.dragMode : "free";
  draggingGizmo = gizmo;
  axisOrigin.copy(gizmo.position);
  setupDragPlane(axisOrigin, dragMode);

  if (activeHost.orbitControls) {
    orbitWasEnabled = activeHost.orbitControls.enabled;
    activeHost.orbitControls.enabled = false;
  }

  dom.setPointerCapture(event.pointerId);
  event.preventDefault();
  event.stopPropagation();
};

const onPointerMove = (event: PointerEvent) => {
  if (!activeHost || !draggingGizmo) return;
  const dom = getDomElement();
  if (!dom) return;

  setPointerNdc(event, dom);
  raycaster.setFromCamera(ndc, activeHost.camera);
  if (!raycaster.ray.intersectPlane(dragPlane, planeHit)) return;

  const next = applyAxisConstraint(planeHit, axisOrigin, dragMode);
  draggingGizmo.position.copy(next);
  writeUniformFromGizmo(draggingGizmo);
};

const onPointerUp = (event: PointerEvent) => {
  if (!draggingGizmo) return;
  const dom = getDomElement();
  if (dom) {
    try {
      dom.releasePointerCapture(event.pointerId);
    } catch {
      // ignore if capture was not set
    }
  }
  if (activeHost?.orbitControls && orbitWasEnabled !== undefined) {
    activeHost.orbitControls.enabled = orbitWasEnabled;
  }
  orbitWasEnabled = undefined;
  draggingGizmo = null;
  dragMode = "free";
};

const attachListeners = () => {
  const dom = getDomElement();
  if (!dom || attached) return;
  dom.addEventListener("pointerdown", onPointerDown);
  dom.addEventListener("pointermove", onPointerMove);
  dom.addEventListener("pointerup", onPointerUp);
  dom.addEventListener("pointercancel", onPointerUp);
  attached = true;
};

const detachListeners = () => {
  const dom = getDomElement();
  if (dom && attached) {
    dom.removeEventListener("pointerdown", onPointerDown);
    dom.removeEventListener("pointermove", onPointerMove);
    dom.removeEventListener("pointerup", onPointerUp);
    dom.removeEventListener("pointercancel", onPointerUp);
  }
  attached = false;
};

export const refreshLightUniformInteraction = (): void => {
  if (!activeHost) return;
  syncHandles();
  if (gizmos.length > 0) {
    attachListeners();
  } else {
    detachListeners();
  }
};

export const enableLightUniformInteraction = (
  host: LightInteractionHost,
): void => {
  activeHost = host;
  setLightSelectableChangeListener(refreshLightUniformInteraction);
  refreshLightUniformInteraction();
};

export const disableLightUniformInteraction = (): void => {
  setLightSelectableChangeListener(null);
  detachListeners();
  clearHandles();
  clearLightUniformSelectableOverrides();
  activeHost = null;
  draggingGizmo = null;
  orbitWasEnabled = undefined;
};
