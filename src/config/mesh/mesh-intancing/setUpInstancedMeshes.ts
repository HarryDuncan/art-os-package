import { MeshComponentConfig } from "../../config.types";
import { createBoundingBox } from "../../../utils/three-dimension-space/createBoundingBox";
import { getEquidistantCoordinates } from "../../../utils/three-dimension-space/position/getEquidistantCoordinates";
import { AXIS, Axis } from "../../../types/position.types";
import { getRandomRotationAsDegrees } from "../../../utils/getRandomRotation";

export const setUpInstancedMeshes = (
  meshComponentConfigs: MeshComponentConfig[]
): MeshComponentConfig[] => {
  if (!meshComponentConfigs) {
    return [];
  }

  const multiMeshes = meshComponentConfigs.flatMap((meshConfig) => {
    return meshConfig.multipleInstanceConfig ? meshConfig : [];
  });

  return multiMeshes.flatMap((meshConfig) => {
    return setUpMulti(meshConfig);
  });
};

const setUpMulti = (meshConfig: MeshComponentConfig) => {
  const { multipleInstanceConfig } = meshConfig;
  if (!multipleInstanceConfig) {
    return [];
  }
  const { instanceCount, boundingBoxConfig } = multipleInstanceConfig;
  const boundingBox = createBoundingBox(boundingBoxConfig);
  const spreadCoordinates = getEquidistantCoordinates(
    instanceCount,
    boundingBox,
    AXIS.Y as Axis
  );
  const formattedMeshConfig = spreadCoordinates.map((coordinate, index) => {
    const meshRotation = multipleInstanceConfig?.randomRotation
      ? getRandomRotationAsDegrees()
      : meshConfig.rotation;
    return {
      ...meshConfig,
      id: `${meshConfig.guid}-${index}`,
      position: coordinate,
      rotation: meshRotation,
    };
  });
  return formattedMeshConfig;
};
