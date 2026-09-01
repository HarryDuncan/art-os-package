import { InteractiveScene } from "../../components/interactive-scene/InteractiveScene";
import {
  CameraTimelineItem,
  CameraTimelinePointKey,
  TimelineConfig,
  TIMELINE_ITEM_TYPES,
} from "../../config/timeline/timeline.types";
import { PositionConfig } from "../../types/position.types";
import { setCameraParams } from "../updateCamera";
import {
  evaluateCameraTimeline,
  isCameraTimelineItem,
} from "./evaluateCameraTimeline";
import { sampleCubicBezier } from "./bezier";

let liveTimelineConfig: TimelineConfig | null = null;
let timelinePlaybackPaused = false;
/** When false, path handles / Bezier curves stay hidden (e.g. parameter panel closed). */
let timelineGizmosVisible = false;
let changeListener: ((item: CameraTimelineItem) => void) | null = null;
let refreshInteractionListener: (() => void) | null = null;

const cloneConfig = (config: TimelineConfig): TimelineConfig =>
  structuredClone(config);

const findCameraItem = (id: string): CameraTimelineItem | null => {
  const item = liveTimelineConfig?.items.find((i) => i.id === id);
  if (!item || !isCameraTimelineItem(item)) return null;
  return item;
};

const getActiveCameraItem = (): CameraTimelineItem | null => {
  const activeId = liveTimelineConfig?.activeItemId;
  if (activeId) {
    return findCameraItem(activeId);
  }
  return null;
};

const getFirstEnabledCameraItem = (): CameraTimelineItem | null => {
  if (!liveTimelineConfig?.items.length) return null;
  for (const item of liveTimelineConfig.items) {
    if (isCameraTimelineItem(item) && item.enabled !== false) {
      return item;
    }
  }
  return null;
};

const notifyChange = (item: CameraTimelineItem) => {
  changeListener?.(item);
};

const notifyRefresh = () => {
  refreshInteractionListener?.();
};

export const setTimelineConfig = (config: TimelineConfig | null): void => {
  liveTimelineConfig = config ? cloneConfig(config) : null;
  notifyRefresh();
};

export const getTimelineConfig = (): TimelineConfig | null =>
  liveTimelineConfig ? cloneConfig(liveTimelineConfig) : null;

export const setTimelinePlaybackPaused = (paused: boolean): void => {
  timelinePlaybackPaused = paused;
};

export const isTimelinePlaybackPaused = (): boolean => timelinePlaybackPaused;

export const setCameraTimelineActiveItem = (id: string | null): void => {
  if (!liveTimelineConfig) {
    liveTimelineConfig = { items: [] };
  }
  liveTimelineConfig.activeItemId = id ?? undefined;
  notifyRefresh();
};

export const setCameraTimelineGizmosVisible = (visible: boolean): void => {
  timelineGizmosVisible = visible;
  notifyRefresh();
};

export const areCameraTimelineGizmosVisible = (): boolean =>
  timelineGizmosVisible;

export const setCameraTimelineChangeListener = (
  fn: ((item: CameraTimelineItem) => void) | null,
): void => {
  changeListener = fn;
};

export const setCameraTimelineRefreshListener = (
  fn: (() => void) | null,
): void => {
  refreshInteractionListener = fn;
};

export const updateCameraTimelineItem = (
  itemId: string,
  partial: Partial<CameraTimelineItem>,
): CameraTimelineItem | null => {
  if (!liveTimelineConfig) return null;
  const index = liveTimelineConfig.items.findIndex((i) => i.id === itemId);
  if (index < 0) return null;
  const existing = liveTimelineConfig.items[index];
  if (!isCameraTimelineItem(existing)) return null;

  const next: CameraTimelineItem = {
    ...existing,
    ...partial,
    type: TIMELINE_ITEM_TYPES.CAMERA,
    id: existing.id,
  };
  liveTimelineConfig.items[index] = next;
  notifyChange(next);
  return next;
};

export const setCameraTimelinePoint = (
  itemId: string,
  pointKey: CameraTimelinePointKey,
  position: PositionConfig,
): CameraTimelineItem | null => {
  const item = findCameraItem(itemId);
  if (!item) return null;

  switch (pointKey) {
    case "start":
      return updateCameraTimelineItem(itemId, {
        start: { ...item.start, position: { ...position } },
      });
    case "end":
      return updateCameraTimelineItem(itemId, {
        end: { ...item.end, position: { ...position } },
      });
    case "controlPoint1":
      return updateCameraTimelineItem(itemId, {
        bezier: {
          ...item.bezier,
          controlPoint1: { ...position },
        },
      });
    case "controlPoint2":
      return updateCameraTimelineItem(itemId, {
        bezier: {
          ...item.bezier,
          controlPoint2: { ...position },
        },
      });
    case "startLookAt":
      return updateCameraTimelineItem(itemId, {
        start: {
          ...item.start,
          lookAt: { ...position },
        },
      });
    case "endLookAt":
      return updateCameraTimelineItem(itemId, {
        end: {
          ...item.end,
          lookAt: { ...position },
        },
      });
    case "lookAtControlPoint1":
      return updateCameraTimelineItem(itemId, {
        lookAtBezier: {
          ...(item.lookAtBezier ?? {
            controlPoint1: { x: 0, y: 0, z: 0 },
            controlPoint2: { x: 0, y: 0, z: 0 },
          }),
          controlPoint1: { ...position },
        },
      });
    case "lookAtControlPoint2":
      return updateCameraTimelineItem(itemId, {
        lookAtBezier: {
          ...(item.lookAtBezier ?? {
            controlPoint1: { x: 0, y: 0, z: 0 },
            controlPoint2: { x: 0, y: 0, z: 0 },
          }),
          controlPoint2: { ...position },
        },
      });
    default:
      return null;
  }
};

export type CameraTimelineSnapshot = {
  activeItem: CameraTimelineItem | null;
  curveSamples: { x: number; y: number; z: number }[];
};

export const getCameraTimelineSnapshot = (): CameraTimelineSnapshot => {
  const activeItem = getActiveCameraItem();
  if (!activeItem) {
    return { activeItem: null, curveSamples: [] };
  }

  return {
    activeItem: structuredClone(activeItem),
    curveSamples: sampleCubicBezier(
      activeItem.start.position,
      activeItem.bezier.controlPoint1,
      activeItem.bezier.controlPoint2,
      activeItem.end.position,
    ),
  };
};

export const updateCameraTimelines = (scene: InteractiveScene): void => {
  if (timelinePlaybackPaused || !liveTimelineConfig) return;

  const item = getFirstEnabledCameraItem();
  if (!item) return;

  const elapsed = scene.clock?.getElapsedTime() ?? 0;
  const state = evaluateCameraTimeline(item, elapsed);

  setCameraParams({
    position: state.position,
    ...(state.fov !== undefined ? { fov: state.fov } : {}),
    ...(state.lookAt ? { lookAt: state.lookAt } : {}),
  });
};

export const getActiveCameraTimelineItemForGizmos = (): CameraTimelineItem | null => {
  if (!timelineGizmosVisible) return null;
  return getActiveCameraItem();
};

export const TIMELINE_PLAYBACK_EVENT = "art-os-timeline-playback";

/** Load timeline config, ensure at least one camera item is enabled, and start playback. */
export const playCameraTimelines = (
  config?: TimelineConfig | null,
): TimelineConfig => {
  setTimelineConfig(config ?? liveTimelineConfig ?? { items: [] });

  const current = liveTimelineConfig;
  if (current) {
    const cameraItems = current.items.filter(isCameraTimelineItem);
    const hasEnabled = cameraItems.some((item) => item.enabled !== false);
    if (!hasEnabled && cameraItems.length > 0) {
      updateCameraTimelineItem(cameraItems[0].id, { enabled: true });
    }
  }

  setTimelinePlaybackPaused(false);

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(TIMELINE_PLAYBACK_EVENT, { detail: { paused: false } }),
    );
  }

  return getTimelineConfig() ?? { items: [] };
};
