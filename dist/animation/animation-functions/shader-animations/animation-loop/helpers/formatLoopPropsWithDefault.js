import { DEFAULT_LOOP_PROPS } from "../animationLoop.consts";
export const formatLoopPropsWithDefault = (defaultLoopProps, parsedLoopProps) => {
    return Object.assign(Object.assign(Object.assign({}, DEFAULT_LOOP_PROPS), defaultLoopProps), parsedLoopProps);
};
