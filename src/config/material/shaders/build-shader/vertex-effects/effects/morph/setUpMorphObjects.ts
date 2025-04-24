import { PreTransformConfig } from "../../../../../../../types/materials/shaders/buildShader.types";
import { preTransforms } from "./pre-transform/preTransforms";

export const setUpMorphObjects = (
  morphCount: number,
  preTransformConfigs: PreTransformConfig[]
) => {
  const preTransformData = preTransforms(preTransformConfigs);
  const morphObjects = new Array(morphCount).fill("").map((_value, index) => {
    const transformData = preTransformData.find(
      (value) => value.index === index
    );
    if (transformData) {
      return {
        pointName: transformData.positionName,
        normalName: `morphNormal${index}`,
      };
    }
    return {
      pointName: `morphPosition${index}`,
      normalName: `morphNormal${index}`,
    };
  });

  const requiredTransformFunctions = preTransformData.flatMap(
    ({ requiredFunctions }) => requiredFunctions
  );
  const transforms = preTransformData.flatMap(({ transform }) => transform);
  return {
    morphObjects,
    transforms,
    requiredFunctions: requiredTransformFunctions,
  };
};
