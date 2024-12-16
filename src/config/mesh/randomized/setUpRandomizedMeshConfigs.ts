import { generateRandomlySpreadCoordinates } from "utils/three-dimension-space/position/getRandomlySpreadCoordinates";
import { MeshComponentConfig } from "../../config.types";
import { createBoundingBox } from "utils/three-dimension-space/createBoundingBox";
import { getRandomRotationAsDegrees } from "utils/randomize/getRandomRotation";

export const setUpRandomizedMeshConfigs = (
  meshComponentConfigs: MeshComponentConfig[]
): MeshComponentConfig[] => {
  if (!meshComponentConfigs) {
    return [];
  }

  const randomizedMeshes = meshComponentConfigs.flatMap((meshConfig) => {
    return meshConfig.randomizationConfig ? meshConfig : [];
  });

  return randomizedMeshes.flatMap((meshConfig) => {
    return setUpRandom(meshConfig);
  });
};

const setUpRandom = (meshConfig: MeshComponentConfig) => {
  const { randomizationConfig, rotation } = meshConfig;
  if (!randomizationConfig) {
    return [];
  }
  const { instanceCount, boundingBoxConfig, randomRotation } =
    randomizationConfig;
  const boundingBox = createBoundingBox(boundingBoxConfig);
  const randomCoordinates = generateRandomlySpreadCoordinates(
    instanceCount,
    [boundingBox],
    [],
    2
  );
  const formattedMeshConfig = randomCoordinates.map((coordinate, index) => {
    const meshRotation = randomRotation
      ? getRandomRotationAsDegrees()
      : rotation;
    return {
      ...meshConfig,
      id: `${meshConfig.id}-${index}`,
      position: coordinate,
      rotation: meshRotation,
    };
  });
  return formattedMeshConfig;
};
