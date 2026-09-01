import { TimelineRepeat } from "../../config/timeline/timeline.types";

/**
 * Map elapsed seconds to normalized progress t in [0, 1] for one animation segment.
 */
export const normalizeTimelineProgress = (
  elapsed: number,
  duration: number,
  repeat: TimelineRepeat,
): number => {
  if (duration <= 0) return 0;

  switch (repeat) {
    case "loop": {
      const cycle = elapsed % duration;
      return cycle / duration;
    }
    case "pingPong": {
      const period = duration * 2;
      const cycle = elapsed % period;
      if (cycle <= duration) {
        return cycle / duration;
      }
      return 2 - cycle / duration;
    }
    case "none":
    default: {
      if (elapsed >= duration) return 1;
      if (elapsed <= 0) return 0;
      return elapsed / duration;
    }
  }
};
