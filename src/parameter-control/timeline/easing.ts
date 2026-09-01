import { TimelineEasing } from "../../config/timeline/timeline.types";

const easeIn = (t: number): number => t * t;
const easeOut = (t: number): number => t * (2 - t);
const easeInOut = (t: number): number =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

export const applyEasing = (t: number, easing: TimelineEasing): number => {
  const clamped = Math.max(0, Math.min(1, t));
  switch (easing) {
    case "easeIn":
      return easeIn(clamped);
    case "easeOut":
      return easeOut(clamped);
    case "easeInOut":
      return easeInOut(clamped);
    case "linear":
    default:
      return clamped;
  }
};
