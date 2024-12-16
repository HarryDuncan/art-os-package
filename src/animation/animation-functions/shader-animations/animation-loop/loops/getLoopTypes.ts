import {
  ANIMATION_LOOP_TYPES,
  DEFAULT_LOOP_PROPS,
} from "../animationLoop.consts";
import {
  AnimationLoopType,
  FlickerLoopProps,
  IncrementLoopProps,
  LoopProps,
} from "../animationloop.types";
import { flickerLoop } from "./flicker-loop/flickerLoop";
import { incrementLoop } from "./increment-loop/incrementLoop";

export const getLoopType = (
  loopType: AnimationLoopType,
  duration: number,
  loopProps: Partial<LoopProps>
) => {
  const { steepness, speed, loopLimit, minTrough, maxPeak } = formatLoopProps(
    loopProps
  );
  switch (loopType) {
    case ANIMATION_LOOP_TYPES.ONE_TO_ONE:
      return (time: number) =>
        (Math.cos((2 * Math.PI * time) / duration) * 0.5 + 0.5) ** steepness;
    case ANIMATION_LOOP_TYPES.ZERO_TO_ZERO:
      return (time: number) =>
        ((Math.cos((2 * Math.PI * time) / duration) * -1 + 1) * 0.5) **
        steepness;
    case ANIMATION_LOOP_TYPES.ZERO_TO_ONE:
      return (time: number) => (time % duration) / duration;
    case ANIMATION_LOOP_TYPES.COUNT:
      return (time: number) => {
        const loopCount = Math.floor(time / duration);
        return loopCount % loopLimit;
      };
    case ANIMATION_LOOP_TYPES.MIN_MAX_RANDOM:
      return (time: number) =>
        Math.max(
          Math.min(
            Math.cos(time * speed) * steepness + 0.5 * Math.random(),
            maxPeak
          ),
          minTrough
        );
    case ANIMATION_LOOP_TYPES.FLICKER: {
      return flickerLoop({ duration, ...loopProps } as FlickerLoopProps);
    }

    case ANIMATION_LOOP_TYPES.MIN_MAX:
      return (time: number) =>
        Math.max(
          Math.min(Math.cos(time * speed) * steepness + 0.5, maxPeak),
          minTrough
        );
    case ANIMATION_LOOP_TYPES.INCREMENT_LOOP:
      return incrementLoop({ duration, ...loopProps } as IncrementLoopProps);
    case ANIMATION_LOOP_TYPES.LINEAR:
    default:
      return (time: number) => time * speed;
  }
};

const formatLoopProps = (parsedLoopProps: Partial<LoopProps>) => {
  return { ...DEFAULT_LOOP_PROPS, ...parsedLoopProps };
};
