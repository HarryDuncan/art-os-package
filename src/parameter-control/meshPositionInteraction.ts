import {
  Box3,
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
import {
  clearMeshPositionSelectableOverrides,
  isMeshPositionSelectable,
  setMeshSelectableChangeListener,
} from "./meshSelectable";
import { getRegisteredParameterControlScene } from "./register";

const HANDLE_USER_DATA_KEY = "meshPositionHandle";
const PART_USER_DATA_KEY = "meshPositionPart";
const SPHERE_RADIUS = 0.18;
const AXIS_LENGTH = 0.85;
const AXIS_RADIUS = 0.045;

type DragMode = "free" | "x" | "y" | "z";

type MeshHandleUserData = {
  [HANDLE_USER_DATA_KEY]: true;
  meshId: string;
  /** World-space offset from mesh.position to visual center when drag started. */
  centerOffset: Vector3;
};

type MeshPartUserData = {
  [PART_USER_DATA_KEY]: true;
  dragMode: DragMode;
};

type MeshInteractionHost = Scene & {
  camera: Camera;
  orbitControls: OrbitControl | null;
};

let activeHost: MeshInteractionHost | null = null;
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
const worldCenter = new Vector3();
const meshWorldPos = new Vector3();
const bbox = new Box3();

let draggingGizmo: Group | null = null;
let dragMode: DragMode = "free";
let orbitWasEnabled: boolean | undefined;

const AXIS_COLORS = {
  x: new Color(0xe74c3c),
  y: new Color(0x2ecc71),
  z: new Color(0x3498db),
};

const isMeshHandleRoot = (obj: Object3D | null): obj is Group =>
  !!obj && obj.userData?.[HANDLE_USER_DATA_KEY] === true;

const findHandleRoot = (obj: Object3D): Group | null => {
  let current: Object3D | null = obj;
  while (current) {
    if (isMeshHandleRoot(current)) return current as Group;
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

  if (axis === "x") {
    mesh.rotation.z = -Math.PI / 2;
    mesh.position.x = AXIS_LENGTH / 2;
  } else if (axis === "y") {
    mesh.position.y = AXIS_LENGTH / 2;
  } else {
    mesh.rotation.x = Math.PI / 2;
    mesh.position.z = AXIS_LENGTH / 2;
  }

  mesh.userData = {
    [PART_USER_DATA_KEY]: true,
    dragMode: axis,
  } satisfies MeshPartUserData;
  return mesh;
};

const createGizmo = (meshId: string): Group => {
  const group = new Group();
  group.frustumCulled = false;
  group.renderOrder = 999;

  const sphere = new Mesh(
    new SphereGeometry(SPHERE_RADIUS, 20, 20),
    new MeshBasicMaterial({
      color: 0x9b59b6,
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
  } satisfies MeshPartUserData;

  group.add(sphere);
  group.add(makeAxisMesh("x"));
  group.add(makeAxisMesh("y"));
  group.add(makeAxisMesh("z"));

  group.userData = {
    [HANDLE_USER_DATA_KEY]: true,
    meshId,
    centerOffset: new Vector3(),
  } satisfies MeshHandleUserData;
  return group;
};

const getMeshWorldCenter = (mesh: Object3D, out: Vector3): Vector3 => {
  bbox.setFromObject(mesh);
  if (!bbox.isEmpty()) {
    return bbox.getCenter(out);
  }
  return mesh.getWorldPosition(out);
};

const findSelectableMeshes = (scene: Scene): Object3D[] => {
  const result: Object3D[] = [];
  scene.traverse((child) => {
    if (!child.name) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(child as any).material) return;
    if (child.userData?.lightUniformHandle) return;
    if (child.userData?.[HANDLE_USER_DATA_KEY]) return;
    if (!isMeshPositionSelectable(child.name)) return;
    result.push(child);
  });
  return result;
};

const syncHandles = () => {
  if (!activeHost) return;
  clearHandles();

  const meshes = findSelectableMeshes(activeHost);
  for (const mesh of meshes) {
    const gizmo = createGizmo(mesh.name);
    getMeshWorldCenter(mesh, worldCenter);
    mesh.getWorldPosition(meshWorldPos);
    const offset = worldCenter.clone().sub(meshWorldPos);
    (gizmo.userData as MeshHandleUserData).centerOffset = offset;
    gizmo.position.copy(worldCenter);
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

  if (mode === "x") axisDir.set(1, 0, 0);
  else if (mode === "y") axisDir.set(0, 1, 0);
  else axisDir.set(0, 0, 1);

  const planeNormal = cameraDir.clone().cross(axisDir);
  if (planeNormal.lengthSq() < 1e-8) {
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

const writeMeshFromGizmo = (gizmo: Group) => {
  const { meshId, centerOffset } = gizmo.userData as MeshHandleUserData;
  const scene = getRegisteredParameterControlScene() ?? activeHost;
  if (!scene) return;
  const mesh = scene.getObjectByName(meshId);
  if (!mesh) return;
  // Gizmo sits at visual center; mesh.position is center minus offset.
  mesh.position.copy(gizmo.position).sub(centerOffset);
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

  const part = hitObj.userData as Partial<MeshPartUserData>;
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
  writeMeshFromGizmo(draggingGizmo);
};

const onPointerUp = (event: PointerEvent) => {
  if (!draggingGizmo) return;
  const dom = getDomElement();
  if (dom) {
    try {
      dom.releasePointerCapture(event.pointerId);
    } catch {
      // ignore
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

export const refreshMeshPositionInteraction = (): void => {
  if (!activeHost) return;
  syncHandles();
  if (gizmos.length > 0) {
    attachListeners();
  } else {
    detachListeners();
  }
};

export const enableMeshPositionInteraction = (
  host: MeshInteractionHost,
): void => {
  activeHost = host;
  setMeshSelectableChangeListener(refreshMeshPositionInteraction);
  refreshMeshPositionInteraction();
};

export const disableMeshPositionInteraction = (): void => {
  setMeshSelectableChangeListener(null);
  detachListeners();
  clearHandles();
  clearMeshPositionSelectableOverrides();
  activeHost = null;
};
