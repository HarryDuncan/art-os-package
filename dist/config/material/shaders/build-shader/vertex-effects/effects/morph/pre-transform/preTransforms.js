import { shaderSafeVector } from "../../../../../../../../utils/conversion/shaderConversions";
import { capitalizeFirstLetter, lowerCaseFirstLetter, } from "../../../../../../../../utils/strings/stringUtils";
import { vertexTranslate } from "../../../../../../../../config/material/shaders/build-shader/shader-properties/functions/translation/translate";
export const preTransforms = (preTransformedItems) => preTransformedItems.flatMap(({ index, pointName, transformType, transformProps }) => {
    const appendedPoint = capitalizeFirstLetter(pointName);
    switch (transformType) {
        case "TRANSLATE" /* TransformTypes.TRANSLATE */: {
            const originalPointName = `${lowerCaseFirstLetter(pointName)}${index}`;
            const positionName = `transform${appendedPoint}${index}`;
            const normalName = `transform${appendedPoint}${index}`;
            const { translate } = transformProps;
            const transform = getTranslateTransform(positionName, originalPointName, translate);
            const requiredFunctions = [
                { id: "translate", functionDefinition: vertexTranslate },
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
const getTranslateTransform = (positionName, pointName, translate) => {
    return `vec3 translateVector = ${shaderSafeVector(translate)};
vec3 ${positionName} = translateVertex(translateVector, ${pointName}.xyz);
  `;
};
