import { ParameterConfig } from "../../buildShader.types";
import { UNIFORM_DECLARATION } from "../../constants";
import {
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../constants/shader.consts";
import { createDeclarationString } from "../../helpers/createDeclarationString";

export const buildUniformDeclaration = (uniformConfigs: ParameterConfig[]) => {
  const customStrings = uniformConfigs.map(
    ({ id, valueType, arrayLength, structProperties }) =>
      createDeclarationString(
        SHADER_PROPERTY_TYPES.UNIFORM as keyof typeof SHADER_PROPERTY_TYPES,
        valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES,
        id,
        arrayLength,
        structProperties
      )
  );
  const uniformDeclaration = [UNIFORM_DECLARATION, ...customStrings].join(
    " \n "
  );

  return uniformDeclaration;
};

// export interface CustomProperties {
//   [key: string]:
//     | { value: unknown; keyPointId?: string }
//     | { value: unknown; keyPointId?: string }[];
// }

// export const setUpCustomPropertyValues = (config: ShaderPropertyConfig[]) => {
//   const customProperties: CustomProperties = {};

//   config.forEach(
//     ({
//       value,
//       id,
//       valueType,
//       arrayLength,
//       structProperties,
//       arrayValue,
//       keyPointId,
//     }) => {
//       if (arrayLength !== undefined) {
//         const propertyValues =
//           arrayValue ??
//           new Array(arrayLength).fill(
//             value ??
//               getDefaultValue(
//                 valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES,
//                 structProperties
//               )
//           );
//         customProperties[id] = { value: propertyValues };
//       } else {
//         const propertyValue =
//           value ??
//           getDefaultValue(
//             valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES,
//             structProperties
//           );
//         if (propertyValue !== undefined && propertyValue !== null) {
//           customProperties[id] = { value: propertyValue };
//           if (keyPointId) {
//             customProperties[id].keyPointId = keyPointId;
//           }
//         } else {
//           console.warn(
//             `Property value for ${id} ${String(valueType)} is undefined`
//           );
//         }
//       }

//       customStrings.push();
//     }
//   );
//   return { customProperties };
// };
