import { shaderSafeFloat } from "../../../../../../../utils/conversion/shaderConversions";
import { VERTEX_POINT_NAME } from "../../vertexEffects.consts";
import { pointsPerspective } from "./pointsPerspective";
export const pointsTransform = (effectProps) => {
    const { pointSize, perspectiveConfig } = effectProps;
    const perspective = pointsPerspective(VERTEX_POINT_NAME, perspectiveConfig);
    const transformation = `gl_PointSize = ${perspective.length ? perspective : shaderSafeFloat(pointSize)};`;
    return transformation;
};
