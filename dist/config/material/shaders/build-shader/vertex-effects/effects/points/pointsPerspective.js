import { shaderSafeFloat } from "../../../../../../../utils/conversion/shaderConversions";
export const pointsPerspective = (pointName, perspectiveConfig) => {
    if (perspectiveConfig) {
        const floor = shaderSafeFloat(perspectiveConfig.floor);
        const max = shaderSafeFloat(perspectiveConfig.ceiling);
        const scaleFactor = shaderSafeFloat(perspectiveConfig.scaleFactor);
        const divisor = shaderSafeFloat(perspectiveConfig.divisor);
        return `max(${floor}, min(${max}, ${scaleFactor} *  (${divisor} / abs(${pointName}.z))))`;
    }
    return "";
};
