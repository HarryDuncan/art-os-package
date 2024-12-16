import {
  AXIS,
  Axis,
} from "utils/three-dimension-space/position/position.types";
import { RotationEffectProps } from "../../../types";
import {
  rotateX,
  rotateY,
  rotateZ,
} from "../../../shader-properties/functions/rotation/rotation";
import { ROTATION_EFFECT_TYPES, ROTATION_UNIFORMS } from "./rotation.consts";
import { shaderSafeFloat } from "utils/conversion/shaderConversions";
import { vertexEffectToEffectData } from "../../../helpers/vertexEffectToEffectData";

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
export const rotationTransform = (
  pointName: string,
  previousPointName: string,
  rotationEffect: RotationEffectProps
) => {
  const {
    uniformConfig,
    requiredFunctions,
    transformation,
    vertexPointInstantiation,
  } = getRotationEffect(pointName, previousPointName, rotationEffect);
  return {
    uniformConfig,
    requiredFunctions,
    transformation,
    vertexPointInstantiation,
  };
};

const getRotationEffect = (
  pointName: string,
  previousPointName: string,
  rotationEffectProps: RotationEffectProps
) => {
  const { effectType, axis, speed, degrees, declareInTransform } =
    rotationEffectProps;

  switch (effectType) {
    case ROTATION_EFFECT_TYPES.ROTATION_BY_DEGREES: {
      const requiredFunctions = getRequiredFunctions(axis as Axis);
      const vertexPointInstantiation = `vec4 ${pointName} = vec4(${previousPointName}.xyz, 1.0);`;
      const transformation = `
        ${declareInTransform ? vertexPointInstantiation : ""}
        mat4 rotationMatrixByTime = ${getFunctionName(
          axis as Axis
        )}(${shaderSafeFloat(degrees ?? 0)});
        ${pointName} = ${pointName} * rotationMatrixByTime; 
      `;
      return vertexEffectToEffectData({
        transformation,
        pointName,
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
      const vertexPointInstantiation = `vec4 ${pointName} = vec4(${previousPointName}.xyz, 1.0);`;
      const transformation = `
        ${declareInTransform ? vertexPointInstantiation : ""}
        float rotationAngle = uTime * uRotationSpeed;
        mat4 rotationMatrix = ${getFunctionName(axis as Axis)}(rotationAngle);
        ${pointName} = ${pointName} * rotationMatrix; 

        `;
      return {
        transformation,
        vertexPointInstantiation,
        requiredFunctions,
        uniformConfig,
      };
    }
  }
};
