import { createBoundingBox } from "../../../utils/three-dimension-space/createBoundingBox";
import { getEquidistantCoordinates } from "../../../utils/three-dimension-space/position/getEquidistantCoordinates";
import { AXIS, } from "../../../utils/three-dimension-space/position/position.types";
export const multipleMeshes = (meshComponentConfigs) => {
    if (!meshComponentConfigs) {
        return [];
    }
    const multiMeshes = meshComponentConfigs.flatMap((meshConfig) => {
        return meshConfig.multipleConfig ? meshConfig : [];
    });
    return multiMeshes.flatMap((meshConfig) => {
        return setUpMulti(meshConfig);
    });
};
const setUpMulti = (meshConfig) => {
    const { multipleConfig } = meshConfig;
    if (!multipleConfig) {
        return [];
    }
    const { instanceCount, boundingBoxConfig } = multipleConfig;
    const boundingBox = createBoundingBox(boundingBoxConfig);
    const spreadCoordinates = getEquidistantCoordinates(instanceCount, boundingBox, AXIS.Y);
    const formattedMeshConfig = spreadCoordinates.map((coordinate, index) => {
        return Object.assign(Object.assign({}, meshConfig), { id: `${meshConfig.id}-${index}`, position: coordinate });
    });
    return formattedMeshConfig;
};
