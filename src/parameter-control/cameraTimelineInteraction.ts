import {
  BufferGeometry,
  Camera,
  CanvasTexture,
  Color,
  CylinderGeometry,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Plane,
  Raycaster,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Vector2,
  Vector3,
} from "three";
import { OrbitControl } from "../types";
import { CameraTimelinePointKey } from "../config/timeline/timeline.types";
import {
  getActiveCameraTimelineItemForGizmos,
  setCameraTimelinePoint,
  setCameraTimelineRefreshListener,
  setTimelinePlaybackPaused,
} from "./timeline/cameraTimelineApi";

const HANDLE_USER_DATA_KEY = "cameraTimelineHandle";
const PART_USER_DATA_KEY = "cameraTimelinePart";
const SPHERE_RADIUS = 0.38;
const LOOK_AT_SPHERE_RADIUS = 0.3;
const AXIS_LENGTH = 1.1;
const AXIS_RADIUS = 0.055;

type DragMode = "free" | "x" | "y" | "z";

type CameraHandleUserData = {
  [HANDLE_USER_DATA_KEY]: true;
  itemId: string;
  pointKey: CameraTimelinePointKey;
};

type CameraPartUserData = {
  [PART_USER_DATA_KEY]: true;
  dragMode: DragMode;
};

type CameraInteractionHost = Scene & {
  camera: Camera;
  orbitControls: OrbitControl | null;
};

const HANDLE_CONFIG: {
  pointKey: CameraTimelinePointKey;
  label: string;
  color: number;
  radius: number;
}[] = [
  { pointKey: "start", label: "Start", color: 0x2ecc71, radius: SPHERE_RADIUS },
  { pointKey: "end", label: "End", color: 0xe74c3c, radius: SPHERE_RADIUS },
  {
    pointKey: "controlPoint1",
    label: "CP1",
    color: 0xf1c40f,
    radius: SPHERE_RADIUS,
  },
  {
    pointKey: "controlPoint2",
    label: "CP2",
    color: 0xf39c12,
    radius: SPHERE_RADIUS,
  },
  {
    pointKey: "startLookAt",
    label: "Look Start",
    color: 0x9b59b6,
    radius: LOOK_AT_SPHERE_RADIUS,
  },
  {
    pointKey: "endLookAt",
    label: "Look End",
    color: 0xe056fd,
    radius: LOOK_AT_SPHERE_RADIUS,
  },
  {
    pointKey: "lookAtControlPoint1",
    label: "Look CP1",
    color: 0xbb86fc,
    radius: LOOK_AT_SPHERE_RADIUS,
  },
  {
    pointKey: "lookAtControlPoint2",
    label: "Look CP2",
    color: 0xd291ff,
    radius: LOOK_AT_SPHERE_RADIUS,
  },
];

let activeHost: CameraInteractionHost | null = null;
const gizmos: Group[] = [];
let curveLine: Line | null = null;
let lookAtCurveLine: Line | null = null;
const facingLines: Line[] = [];
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

const isCameraHandleRoot = (obj: Object3D | null): obj is Group =>
  !!obj && obj.userData?.[HANDLE_USER_DATA_KEY] === true;

const findHandleRoot = (obj: Object3D): Group | null => {
  let current: Object3D | null = obj;
  while (current) {
    if (isCameraHandleRoot(current)) return current as Group;
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
    if (child instanceof Sprite) {
      child.material.map?.dispose();
      child.material.dispose();
    }
    if (child instanceof Line) {
      child.geometry.dispose();
      if (Array.isArray(child.material)) {
        child.material.forEach((m) => m.dispose());
      } else {
        child.material.dispose();
      }
    }
  });
};

const createLabelSprite = (text: string, offsetY: number): Sprite => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new Sprite(new SpriteMaterial({ depthTest: false }));
  }

  const fontSize = 48;
  ctx.font = `bold ${fontSize}px sans-serif`;
  const metrics = ctx.measureText(text);
  canvas.width = Math.ceil(metrics.width + 24);
  canvas.height = fontSize + 24;

  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.fillStyle = "rgba(0,0,0,0.65)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 12, canvas.height / 2);

  const texture = new CanvasTexture(canvas);
  const material = new SpriteMaterial({
    map: texture,
    depthTest: false,
    transparent: true,
  });
  const sprite = new Sprite(material);
  const aspect = canvas.width / canvas.height;
  sprite.scale.set(0.55 * aspect, 0.55, 1);
  sprite.position.y = offsetY;
  sprite.renderOrder = 1001;
  sprite.frustumCulled = false;
  return sprite;
};

const makeAxisMesh = (axis: "x" | "y" | "z"): Mesh => {
  const geometry = new CylinderGeometry(
    AXIS_RADIUS,
    AXIS_RADIUS,
    AXIS_LENGTH,
    10,
  );
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
  } satisfies CameraPartUserData;
  return mesh;
};

const createHandleGizmo = (
  itemId: string,
  pointKey: CameraTimelinePointKey,
  color: number,
  label: string,
  position: Vector3,
  radius: number,
): Group => {
  const group = new Group();
  group.frustumCulled = false;
  group.renderOrder = 999;
  group.position.copy(position);

  const sphere = new Mesh(
    new SphereGeometry(radius, 24, 24),
    new MeshBasicMaterial({
      color,
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
  } satisfies CameraPartUserData;

  group.add(sphere);
  group.add(makeAxisMesh("x"));
  group.add(makeAxisMesh("y"));
  group.add(makeAxisMesh("z"));
  group.add(createLabelSprite(label, radius * 2.2));

  group.userData = {
    [HANDLE_USER_DATA_KEY]: true,
    itemId,
    pointKey,
  } satisfies CameraHandleUserData;

  return group;
};

const getPointPosition = (
  item: NonNullable<ReturnType<typeof getActiveCameraTimelineItemForGizmos>>,
  pointKey: CameraTimelinePointKey,
): Vector3 => {
  switch (pointKey) {
    case "start":
      return new Vector3(
        item.start.position.x ?? 0,
        item.start.position.y ?? 0,
        item.start.position.z ?? 0,
      );
    case "end":
      return new Vector3(
        item.end.position.x ?? 0,
        item.end.position.y ?? 0,
        item.end.position.z ?? 0,
      );
    case "controlPoint1":
      return new Vector3(
        item.bezier.controlPoint1.x ?? 0,
        item.bezier.controlPoint1.y ?? 0,
        item.bezier.controlPoint1.z ?? 0,
      );
    case "controlPoint2":
      return new Vector3(
        item.bezier.controlPoint2.x ?? 0,
        item.bezier.controlPoint2.y ?? 0,
        item.bezier.controlPoint2.z ?? 0,
      );
    case "startLookAt":
      return new Vector3(
        item.start.lookAt?.x ?? 0,
        item.start.lookAt?.y ?? 0,
        item.start.lookAt?.z ?? 0,
      );
    case "endLookAt":
      return new Vector3(
        item.end.lookAt?.x ?? 0,
        item.end.lookAt?.y ?? 0,
        item.end.lookAt?.z ?? 0,
      );
    case "lookAtControlPoint1":
      return new Vector3(
        item.lookAtBezier?.controlPoint1.x ?? 0,
        item.lookAtBezier?.controlPoint1.y ?? 0,
        item.lookAtBezier?.controlPoint1.z ?? 0,
      );
    case "lookAtControlPoint2":
      return new Vector3(
        item.lookAtBezier?.controlPoint2.x ?? 0,
        item.lookAtBezier?.controlPoint2.y ?? 0,
        item.lookAtBezier?.controlPoint2.z ?? 0,
      );
    default:
      return new Vector3();
  }
};

const sampleBezierPoints = (
  p0: Vector3,
  p1: Vector3,
  p2: Vector3,
  p3: Vector3,
  segments = 32,
): Vector3[] => {
  const points: Vector3[] = [];
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;
    points.push(
      new Vector3(
        uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
        uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y,
        uuu * p0.z + 3 * uu * t * p1.z + 3 * u * tt * p2.z + ttt * p3.z,
      ),
    );
  }
  return points;
};

const removeLine = (line: Line | null) => {
  if (!line || !activeHost) return;
  activeHost.remove(line);
  disposeObject(line);
};

const addLine = (
  points: Vector3[],
  color: number,
  opacity: number,
  renderOrder: number,
): Line => {
  const geometry = new BufferGeometry().setFromPoints(points);
  const material = new LineBasicMaterial({
    color,
    depthTest: false,
    transparent: true,
    opacity,
  });
  const line = new Line(geometry, material);
  line.renderOrder = renderOrder;
  line.frustumCulled = false;
  activeHost?.add(line);
  return line;
};

const updateCurveLine = (
  item: NonNullable<ReturnType<typeof getActiveCameraTimelineItemForGizmos>>,
) => {
  if (!activeHost) return;

  removeLine(curveLine);
  curveLine = null;
  removeLine(lookAtCurveLine);
  lookAtCurveLine = null;
  for (const line of facingLines) {
    removeLine(line);
  }
  facingLines.length = 0;

  const p0 = getPointPosition(item, "start");
  const p1 = getPointPosition(item, "controlPoint1");
  const p2 = getPointPosition(item, "controlPoint2");
  const p3 = getPointPosition(item, "end");
  curveLine = addLine(
    sampleBezierPoints(p0, p1, p2, p3),
    0x74b9ff,
    0.85,
    998,
  );

  if (item.start.lookAt && item.end.lookAt) {
    const la0 = getPointPosition(item, "startLookAt");
    const la1 = getPointPosition(item, "lookAtControlPoint1");
    const la2 = getPointPosition(item, "lookAtControlPoint2");
    const la3 = getPointPosition(item, "endLookAt");

    lookAtCurveLine = addLine(
      sampleBezierPoints(la0, la1, la2, la3),
      0xe056fd,
      0.75,
      997,
    );

    facingLines.push(
      addLine([p0, la0], 0xffffff, 0.45, 996),
      addLine([p3, la3], 0xffffff, 0.45, 996),
    );
  }
};

const clearHandles = () => {
  if (!activeHost) return;
  for (const gizmo of gizmos) {
    activeHost.remove(gizmo);
    disposeObject(gizmo);
  }
  gizmos.length = 0;

  if (curveLine) {
    activeHost.remove(curveLine);
    disposeObject(curveLine);
    curveLine = null;
  }
  if (lookAtCurveLine) {
    activeHost.remove(lookAtCurveLine);
    disposeObject(lookAtCurveLine);
    lookAtCurveLine = null;
  }
  for (const line of facingLines) {
    activeHost.remove(line);
    disposeObject(line);
  }
  facingLines.length = 0;
};

const syncHandles = () => {
  if (!activeHost) return;
  clearHandles();

  const item = getActiveCameraTimelineItemForGizmos();
  if (!item) {
    detachListeners();
    return;
  }

  for (const config of HANDLE_CONFIG) {
    const position = getPointPosition(item, config.pointKey);
    const gizmo = createHandleGizmo(
      item.id,
      config.pointKey,
      config.color,
      config.label,
      position,
      config.radius,
    );
    activeHost.add(gizmo);
    gizmos.push(gizmo);
  }

  updateCurveLine(item);
  attachListeners();
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

const writeGizmoToTimeline = (gizmo: Group) => {
  const { itemId, pointKey } = gizmo.userData as CameraHandleUserData;
  setCameraTimelinePoint(itemId, pointKey, {
    x: gizmo.position.x,
    y: gizmo.position.y,
    z: gizmo.position.z,
  });
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

  const part = hitObj.userData as Partial<CameraPartUserData>;
  dragMode =
    part[PART_USER_DATA_KEY] && part.dragMode ? part.dragMode : "free";
  draggingGizmo = gizmo;
  axisOrigin.copy(gizmo.position);
  setupDragPlane(axisOrigin, dragMode);

  setTimelinePlaybackPaused(true);

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
  writeGizmoToTimeline(draggingGizmo);

  const item = getActiveCameraTimelineItemForGizmos();
  if (item) {
    updateCurveLine(item);
  }
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

export const refreshCameraTimelineInteraction = (): void => {
  if (!activeHost) return;
  syncHandles();
};

export const enableCameraTimelineInteraction = (
  host: CameraInteractionHost,
): void => {
  activeHost = host;
  setCameraTimelineRefreshListener(refreshCameraTimelineInteraction);
  refreshCameraTimelineInteraction();
};

export const disableCameraTimelineInteraction = (): void => {
  setCameraTimelineRefreshListener(null);
  detachListeners();
  clearHandles();
  activeHost = null;
};
