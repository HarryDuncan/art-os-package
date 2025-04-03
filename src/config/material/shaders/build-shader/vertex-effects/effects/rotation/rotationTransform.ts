import { AXIS, Axis } from "../../../../../../../types/position.types";
import { RotationEffectProps } from "../../../types";
import {
  rotateX,
  rotateY,
  rotateZ,
} from "../../../shader-properties/functions/rotation/rotation";
import { ROTATION_EFFECT_TYPES, ROTATION_UNIFORMS } from "./rotation.consts";
import { shaderSafeFloat } from "../../../../../../../utils/conversion/shaderConversions";
import { vertexEffectToEffectData } from "../../../helpers/vertexEffectToEffectData";
import {
  VERTEX_NORMAL_NAME,
  VERTEX_POINT_NAME,
} from "../../vertexEffects.consts";

const getFunctionName = (axis: Axis) => {
  switch (axis) {
    case AXIS.X:
      return "rotateX";
    case AXIS.Y:
      return "rotateY";
    case AXIS.Z:
    default:
      return "rotateZ";
  }
};

const getRequiredFunctions = (axis: Axis) => {
  switch (axis) {
    case AXIS.X:
      return [{ id: "rotateX", functionDefinition: rotateX }];
    case AXIS.Y:
      return [{ id: "rotateY", functionDefinition: rotateY }];
    case AXIS.Z:
    default:
      return [{ id: "rotateZ", functionDefinition: rotateZ }];
  }
};
export const rotationTransform = (rotationEffect: RotationEffectProps) => {
  const { uniformConfig, requiredFunctions, transformation } =
    getRotationEffect(rotationEffect);
  return {
    uniformConfig,
    requiredFunctions,
    transformation,
  };
};

const getRotationEffect = (rotationEffectProps: RotationEffectProps) => {
  const { effectType, axis, speed, degrees } = rotationEffectProps;
  switch (effectType) {
    case ROTATION_EFFECT_TYPES.ROTATION_BY_DEGREES: {
      const requiredFunctions = getRequiredFunctions(axis as Axis);

      const transformation = `
      
        mat4 rotationMatrixByTime = ${getFunctionName(
          axis as Axis
        )}(${shaderSafeFloat(degrees ?? 0)});
        ${VERTEX_POINT_NAME} = ${VERTEX_POINT_NAME} * rotationMatrixByTime; 
        ${VERTEX_NORMAL_NAME} = ${VERTEX_NORMAL_NAME} * rotationalMatrixByTime;
      `;
      return vertexEffectToEffectData({
        transformation,

        requiredFunctions,
      });
    }
    case ROTATION_EFFECT_TYPES.ROTATION_BY_TIME:
    default: {
      const uniformConfig = {
        ...ROTATION_UNIFORMS,
        customUniforms: ROTATION_UNIFORMS.customUniforms.map((uniformConfig) =>
          uniformConfig.id === "uRotationSpeed"
            ? { ...uniformConfig, value: speed }
            : uniformConfig
        ),
      };

      const requiredFunctions = getRequiredFunctions(axis as Axis);

      const transformation = `
       
        float rotationAngle = uTime * uRotationSpeed;
        mat4 rotationMatrix = ${getFunctionName(axis as Axis)}(rotationAngle);
        ${VERTEX_POINT_NAME} = ${VERTEX_POINT_NAME} * rotationMatrix; 
        ${VERTEX_NORMAL_NAME} = ${VERTEX_NORMAL_NAME} * rotationMatrix;
        `;
      return {
        transformation,

        requiredFunctions,
        uniformConfig,
      };
    }
  }
};
