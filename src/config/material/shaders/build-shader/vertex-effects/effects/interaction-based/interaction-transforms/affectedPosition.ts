import { TransformationConfig } from "../../../../buildShader.types";
import { VERTEX_POINT_NAME } from "../../../vertexEffects.consts";

export const affectedPositionTransformConfig = {
  effectName: "affectedPosition",
  instantiationName: "",
  singleInstance: true,
  allowedValueTypes: [],
  prefix: "",
  effectCode: [
    `vec3 effectDistanceVector =  vec3(uAffectedPosition.xy, 0.0) - vec3(${VERTEX_POINT_NAME}.xy, 0.0);`,
    `float effectDistanceLength = length(effectDistanceVector);`,
    `if(effectDistanceLength <= uMinDistance ){`,
  ],
} as unknown as TransformationConfig;
