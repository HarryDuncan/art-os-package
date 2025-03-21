"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointsPerspective = void 0;
const shaderConversions_1 = require("../../../../../../../utils/conversion/shaderConversions");
const pointsPerspective = (pointName, perspectiveConfig) => {
    if (perspectiveConfig) {
        const floor = (0, shaderConversions_1.shaderSafeFloat)(perspectiveConfig.floor);
        const max = (0, shaderConversions_1.shaderSafeFloat)(perspectiveConfig.ceiling);
        const scaleFactor = (0, shaderConversions_1.shaderSafeFloat)(perspectiveConfig.scaleFactor);
        const divisor = (0, shaderConversions_1.shaderSafeFloat)(perspectiveConfig.divisor);
        return `max(${floor}, min(${max}, ${scaleFactor} *  (${divisor} / abs(${pointName}.z))))`;
    }
    return "";
};
exports.pointsPerspective = pointsPerspective;
