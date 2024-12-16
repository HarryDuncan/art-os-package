import { ShaderPropertyValueTypes } from "../../../../../constants";
import { twisterDistortion } from "../../../../../shader-properties/functions/distortion/distortion";
import { ShaderFunction, UniformConfig } from "../../../../../types";

export const flexyTwister = (
  pointName: string,
  _previousPointName: string,
  _effectProps: unknown
) => {
  const uniformConfig = {
    defaultUniforms: [],
    customUniforms: [
      {
        id: "uTwistRange",
        valueType: ShaderPropertyValueTypes.FLOAT,
        value: 1.5,
      },
    ],
  } as UniformConfig;
  const requiredFunctions = [
    { id: "twister", functionDefinition: twisterDistortion },
  ] as ShaderFunction[];
  const transformation = `
     float howFarUp = position.y;

    float angle = sin(uTime) * uTwistRange;

    float twistAngle = angle * howFarUp;
    vec4 ${pointName} = twister( vec4( position, 1.0 ), twistAngle );
    vec4 twistNormal = twister( vec4( normal, 1.0 ), twistAngle );
    vec4 twistedNormal = twister( vec4( normal, 1.0 ), twistAngle );`;
  return {
    transformation,
    uniformConfig,
    pointName,
    requiredFunctions,
  };
};
