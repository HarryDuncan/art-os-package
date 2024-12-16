import { FlickerLoopProps } from "../../animationloop.types";
import { formatLoopPropsWithDefault } from "../../helpers/formatLoopPropsWithDefault";
import {
  DEFAULT_FLICKER_LOOP_PROPS,
  FLICKER_LOOP_TYPES,
} from "./flickerLoop.consts";

export const flickerLoop = (flickerLoopProps: Partial<FlickerLoopProps>) => {
  const { flickerTimeAtMax, flickerType, peak, trough } =
    formatLoopPropsWithDefault(
      DEFAULT_FLICKER_LOOP_PROPS,
      flickerLoopProps
    ) as FlickerLoopProps;

  switch (flickerType) {
    case FLICKER_LOOP_TYPES.UNDULATING:
      return (time: number) =>
        (Math.tan(time * 150) + 0.5) * Math.random() >
        Math.cos(time) * flickerTimeAtMax
          ? peak
          : trough;
    // return (time: number) =>
    //   (Math.sin(time * 150) + 0.5) * Math.random() >
    //   Math.cos(time) * flickerTimeAtMax
    //     ? peak
    //     : trough;
    // case FLICKER_LOOP_TYPES.SLOW_FLICKER:
    //     return (time: number) =>
    //       (Math.sin(time * 150) + 0.5) * Math.random() >
    //       Math.sin(time) * flickerTimeAtMax
    //         ? peak
    //         : trough;
    case FLICKER_LOOP_TYPES.FIXED:
    default:
      return (time: number) =>
        (Math.sin(time * 150) + 0.5) * Math.random() > flickerTimeAtMax
          ? peak
          : trough;
  }
};
