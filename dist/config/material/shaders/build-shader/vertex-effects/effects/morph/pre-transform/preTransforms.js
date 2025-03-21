"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preTransforms = void 0;
const shaderConversions_1 = require("../../../../../../../../utils/conversion/shaderConversions");
const stringUtils_1 = require("../../../../../../../../utils/strings/stringUtils");
const translate_1 = require("../../../../../../../../config/material/shaders/build-shader/shader-properties/functions/translation/translate");
const preTransforms = (preTransformedItems) => preTransformedItems.flatMap(({ index, pointName, transformType, transformProps }) => {
    const appendedPoint = (0, stringUtils_1.capitalizeFirstLetter)(pointName);
    switch (transformType) {
        case "TRANSLATE" /* TransformTypes.TRANSLATE */: {
            const originalPointName = `${(0, stringUtils_1.lowerCaseFirstLetter)(pointName)}${index}`;
            const positionName = `transform${appendedPoint}${index}`;
            const normalName = `transform${appendedPoint}${index}`;
            const { translate } = transformProps;
            const transform = getTranslateTransform(positionName, originalPointName, translate);
            const requiredFunctions = [
                { id: "translate", functionDefinition: translate_1.vertexTranslate },
            ];
            return {
                transform,
                requiredFunctions,
                positionName,
                normalName,
                index,
            };
        }
        default:
            console.warn(`no pre transform configured for ${transformType}`);
            return [];
    }
});
exports.preTransforms = preTransforms;
const getTranslateTransform = (positionName, pointName, translate) => {
    return `vec3 translateVector = ${(0, shaderConversions_1.shaderSafeVector)(translate)};
vec3 ${positionName} = translateVertex(translateVector, ${pointName}.xyz);
  `;
};
