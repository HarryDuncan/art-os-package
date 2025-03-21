import { formatLoopPropsWithDefault } from "../../helpers/formatLoopPropsWithDefault";
import { DEFAULT_INCREMENT_LOOP_PROPS } from "./incrementLoop.consts";
export const incrementLoop = (incrementLoopProps) => {
    const loopProps = formatLoopPropsWithDefault(DEFAULT_INCREMENT_LOOP_PROPS, incrementLoopProps);
    const { overlapPercentage, duration } = loopProps;
    return (time) => {
        const progress = (time % duration) / duration;
        const loopCount = Math.floor(time / duration);
        const normalizedProgress = Math.sin(progress * Math.PI) * loopCount;
        return normalizedProgress * (1 + overlapPercentage);
    };
};
