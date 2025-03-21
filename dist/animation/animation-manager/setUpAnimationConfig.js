import { calculateCurve } from "../animation-functions/mesh-animations/traversal/calculateBeizier";
import { ANIMATION_TYPES } from "../animation.constants";
import { DEFAULT_ANIMATION_DURATION_MILIS } from "../animation.defaults";
import { position3dToVector } from "../../utils/conversion/conversion";
export const setUpAnimationConfig = (animationConfig) => {
    const { animationProperties } = animationConfig;
    switch (animationProperties.animationType) {
        case ANIMATION_TYPES.TRAVERSE: {
            const { startPosition, endPosition, curveSize, animationDurationMilis } = animationProperties;
            const curveStart = position3dToVector(startPosition);
            const curveEnd = position3dToVector(endPosition);
            const curve = calculateCurve(curveStart, curveEnd, curveSize);
            return Object.assign(Object.assign({}, animationConfig), { animationProperties: Object.assign(Object.assign({}, animationProperties), { startPosition: curveStart, endPosition: curveEnd, animationDurationMilis: animationDurationMilis !== null && animationDurationMilis !== void 0 ? animationDurationMilis : DEFAULT_ANIMATION_DURATION_MILIS, curve }) });
        }
        default: {
            return animationConfig;
        }
    }
};
