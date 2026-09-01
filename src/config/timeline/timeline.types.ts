import { PositionConfig } from "../../types/position.types";

export const TIMELINE_ITEM_TYPES = {
  CAMERA: "camera",
} as const;

export type TimelineItemType =
  (typeof TIMELINE_ITEM_TYPES)[keyof typeof TIMELINE_ITEM_TYPES];

export const TIMELINE_EASING = {
  LINEAR: "linear",
  EASE_IN: "easeIn",
  EASE_OUT: "easeOut",
  EASE_IN_OUT: "easeInOut",
} as const;

export type TimelineEasing =
  (typeof TIMELINE_EASING)[keyof typeof TIMELINE_EASING];

export const TIMELINE_REPEAT = {
  NONE: "none",
  LOOP: "loop",
  PING_PONG: "pingPong",
} as const;

export type TimelineRepeat =
  (typeof TIMELINE_REPEAT)[keyof typeof TIMELINE_REPEAT];

export type TimelineItemBase = {
  id: string;
  title: string;
  description: string;
  duration: number;
  easing: TimelineEasing;
  repeat: TimelineRepeat;
  enabled?: boolean;
};

export type CameraKeyframe = {
  position: PositionConfig;
  fov?: number;
  /** World-space point the camera faces at this keyframe. */
  lookAt?: PositionConfig;
};

export type CameraBezierConfig = {
  controlPoint1: PositionConfig;
  controlPoint2: PositionConfig;
};

export type CameraTimelineItem = TimelineItemBase & {
  type: typeof TIMELINE_ITEM_TYPES.CAMERA;
  start: CameraKeyframe;
  end: CameraKeyframe;
  bezier: CameraBezierConfig;
  /** Optional Bezier path for interpolating lookAt between keyframes. */
  lookAtBezier?: CameraBezierConfig;
};

export type TimelineItem = CameraTimelineItem;

export type TimelineConfig = {
  items: TimelineItem[];
  /** Item currently shown in viewport gizmos (optional; UI-managed). */
  activeItemId?: string;
};

export type CameraTimelinePointKey =
  | "start"
  | "end"
  | "controlPoint1"
  | "controlPoint2"
  | "startLookAt"
  | "endLookAt"
  | "lookAtControlPoint1"
  | "lookAtControlPoint2";
