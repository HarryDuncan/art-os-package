import { Vector3 } from "three";
import { ShaderPropertyValueTypes } from "../../../../../constants";
import { UniformConfig } from "../../../../../types";
import { scaleVector3 } from "../../../../../shader-properties/functions/maths/vectorCalculations";

export const stretch = (
  pointName: string,
  previousPointName: string,
  _effectProps: unknown
) => {
  const uniformConfig = {
    defaultUniforms: [],
    customUniforms: [
      {
        id: "uStretchStrength",
        valueType: ShaderPropertyValueTypes.FLOAT,
        arrayValue: 0.0,
      },
      {
        id: "uCenter",
        valueType: ShaderPropertyValueTypes.VEC3,
        value: new Vector3(0, 0, 0),
      },
    ],
  } as UniformConfig;

  const requiredFunctions = [
    { id: "scaleVector3", functionDefinition: scaleVector3 },
  ];

  const transformation = `
    vec4 p = vec4(${previousPointName}, 1.0);
    vec4 ${pointName} = p;
    vec3 stretchPoint1 = scaleVector3(-7.0, uStretchStrength);
    vec3 stretchPoint2 = scaleVector3(7.0, uStretchStrength);
    // get the distance from position to uStrechPoints 1 and 2
    vec3 center = vec3(0.0,0.0,0.0);

    // Calculate distance from the vertex position to the center and stretch points
    float distFromCenter = distance(${pointName}.xyz, center);
    float distFromStretch1 = distance(${pointName}.xyz, stretchPoint1);
    float distFromStretch2 = distance(${pointName}.xyz, stretchPoint2);

    vec3 selectedPosition = distFromStretch1 < distFromStretch2 ? stretchPoint1 : stretchPoint2;
    float minStretchDistance = min(distFromStretch1, distFromStretch2);

    // Linearly interpolate stretch factor based on the distance
    float stretchFactor = mix(1.0, 2.0, minStretchDistance / distFromCenter);
    
 
    // Apply the stretch transformation
    vec3 stretchedPosition = mix(${pointName}.xyz, selectedPosition,  1.0 / stretchFactor);

    // Assign the transformed position
    ${pointName} = vec4(stretchedPosition, 1.0);
    vec4 twistedNormal = vec4( normal, 1.0 );`;
  return {
    transformation,
    uniformConfig,
    pointName,
    requiredFunctions,
  };
};
