import { Vector3 } from "three";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../../../../../../../../consts/materials/shader.consts";
import { scaleVector3 } from "../../../../../shader-properties/functions/maths/vectorCalculations";
import { VERTEX_POINT_NAME } from "../../../../../../../../../consts/materials/vertexEffects.consts";
import { UniformConfig } from "../../../../../../../../../types/materials/shaders/buildShader.types";

export const stretch = (_effectProps: unknown) => {
  const uniformConfig = {
    defaultUniforms: [],
    customUniforms: [
      {
        id: "uStretchStrength",
        valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
        arrayValue: 0.0,
      },
      {
        id: "uCenter",
        valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
        value: new Vector3(0, 0, 0),
      },
    ],
  } as UniformConfig;

  const requiredFunctions = [
    { id: "scaleVector3", functionDefinition: scaleVector3 },
  ];

  const transformation = `
    vec4 p = vec4(${VERTEX_POINT_NAME}, 1.0);
    vec4 ${VERTEX_POINT_NAME} = p;
    vec3 stretchPoint1 = scaleVector3(-7.0, uStretchStrength);
    vec3 stretchPoint2 = scaleVector3(7.0, uStretchStrength);
    // get the distance from position to uStrechPoints 1 and 2
    vec3 center = vec3(0.0,0.0,0.0);

    // Calculate distance from the vertex position to the center and stretch points
    float distFromCenter = distance(${VERTEX_POINT_NAME}.xyz, center);
    float distFromStretch1 = distance(${VERTEX_POINT_NAME}.xyz, stretchPoint1);
    float distFromStretch2 = distance(${VERTEX_POINT_NAME}.xyz, stretchPoint2);

    vec3 selectedPosition = distFromStretch1 < distFromStretch2 ? stretchPoint1 : stretchPoint2;
    float minStretchDistance = min(distFromStretch1, distFromStretch2);

    // Linearly interpolate stretch factor based on the distance
    float stretchFactor = mix(1.0, 2.0, minStretchDistance / distFromCenter);
    
 
    // Apply the stretch transformation
    vec3 stretchedPosition = mix(${VERTEX_POINT_NAME}.xyz, selectedPosition,  1.0 / stretchFactor);

    // Assign the transformed position
    ${VERTEX_POINT_NAME} = vec4(stretchedPosition, 1.0);
    vec4 twistedNormal = vec4( normal, 1.0 );`;
  return {
    transformation,
    uniformConfig,
    VERTEX_POINT_NAME,
    requiredFunctions,
  };
};
