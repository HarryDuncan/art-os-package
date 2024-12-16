import { DEFAULT_LOOP_PROPS } from "../animationLoop.consts";
import { AnimationLoopProps } from "../animationloop.types";

export const formatLoopPropsWithDefault = (
  defaultLoopProps: AnimationLoopProps,
  parsedLoopProps: Partial<AnimationLoopProps>
) => {
  return { ...DEFAULT_LOOP_PROPS, ...defaultLoopProps, ...parsedLoopProps };
};
