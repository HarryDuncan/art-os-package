import {
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../constants/shader.consts";
import { createDeclarationString } from "../../helpers/createDeclarationString";
import { getDefaultValueAsString } from "../../helpers/getDefaultValue";
import {
  VARYING_TYPES,
  V_CUSTOM_INSTANTIATION,
  V_DECLARATION,
  V_DEFAULT_INSTANTIATION,
} from "./varyings.consts";
import {
  VERTEX_NORMAL_NAME,
  VERTEX_POINT_NAME,
} from "../../vertex-effects/vertexEffects.consts";
import { ParameterConfig } from "../../../../../../types/materials/index";
import { ShaderFunction } from "../../buildShader.types";

export const buildVaryings = (
  varyingSchema: ParameterConfig[],
  attributeConfigs: ParameterConfig[],
  vertexEffectFunctions: ShaderFunction[]
) => {
  const declaration = varyingDeclarations(varyingSchema);
  const instantiation = varyingInstantiation(
    varyingSchema,
    attributeConfigs,
    vertexEffectFunctions
  );
  return { declaration, instantiation };
};

const varyingDeclarations = (config: ParameterConfig[]) => {
  const declarationStrings = config.map(({ id, valueType }) =>
    createDeclarationString(
      SHADER_PROPERTY_TYPES.VARYING as keyof typeof SHADER_PROPERTY_TYPES,
      valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES,
      id
    )
  );
  const declaration = [V_DECLARATION, ...declarationStrings].join(" \n ");
  return declaration;
};

const varyingInstantiation = (
  varyingConfigs: ParameterConfig[],
  attributeConfigs: ParameterConfig[],
  vertexEffectFunctions: ShaderFunction[]
) => {
  const defaultVaryingStrings = getDefaultVaryingString(varyingConfigs);
  const attributeVaryingStrings = getAttributeVaryingStrings(
    varyingConfigs,
    attributeConfigs
  );
  const customVaryingsStrings = getCustomVaryingStrings(varyingConfigs);
  const functionVaryingsStrings = getFunctionVaryingStrings(
    varyingConfigs,
    vertexEffectFunctions
  );
  return [
    ...defaultVaryingStrings,
    ...attributeVaryingStrings,
    ...customVaryingsStrings,
    ...functionVaryingsStrings,
  ].join(" \n ");
};

const getDefaultVaryingString = (config: ParameterConfig[]) => {
  const defaultVaryings: ParameterConfig[] = config.filter(
    (item) => item.varyingConfig?.varyingType === VARYING_TYPES.DEFAULT
  );
  if (!defaultVaryings.length) return [];
  const strings = [V_DEFAULT_INSTANTIATION];
  defaultVaryings.forEach((item: ParameterConfig) => {
    switch (item.id) {
      case "vUv":
        strings.push("vUv = uv;");
        break;
      case "vPosition":
        strings.push(`vPosition = ${VERTEX_POINT_NAME}.xyz;`);
        break;
      case "vNormal":
        strings.push(`vNormal = ${VERTEX_NORMAL_NAME}.xyz;`);
        break;
      case "vModelViewMatrix":
        strings.push("vModelViewMatrix = modelViewMatrix;");
        break;
      case "vNormalInterpolation":
        strings.push(
          `vNormalInterpolation = normalize(normalMatrix  * ${VERTEX_NORMAL_NAME}.xyz);`
        );
        break;
      case "vTexCoord":
        strings.push(`vTexCoord = texcoord;`);
        break;
      case "vGeometryNormal":
        strings.push(`vGeometryNormal = ${VERTEX_NORMAL_NAME}.xyz`);
        break;
      case "vEye":
        strings.push(
          `vEye = normalize(vec3(modelViewMatrix * vec4(${VERTEX_POINT_NAME}.xyz, 1.0)));`
        );
        break;
      default:
        console.warn(`nothing made for default varying ${item.id}`);
    }
  });
  return strings;
};

const getCustomVaryingStrings = (config: ParameterConfig[]) => {
  const customVaryings = config.filter(
    ({ varyingConfig }) => varyingConfig?.varyingType === VARYING_TYPES.CUSTOM
  );
  if (!customVaryings.length) return [];
  const strings = [V_CUSTOM_INSTANTIATION];
  customVaryings.forEach((item: ParameterConfig) => {
    strings.push(
      `${item.id} = ${
        item.value ??
        getDefaultValueAsString(
          item.valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES
        )
      };`
    );
  });
  return strings;
};

const getAttributeVaryingStrings = (
  config: ParameterConfig[],
  attributeConfigs: ParameterConfig[] = []
) =>
  config.flatMap(({ id, varyingConfig }) => {
    if (varyingConfig?.varyingType === VARYING_TYPES.ATTRIBUTE) {
      const hasAttribute = attributeConfigs.findIndex(
        (attributeConf) => attributeConf.id === varyingConfig?.attributeKey
      );
      if (hasAttribute !== -1) {
        return `${id} = ${varyingConfig?.attributeKey};`;
      }
      console.warn(
        `varying ${id} links to ${varyingConfig?.attributeKey} but ${varyingConfig?.attributeKey} is not found`
      );
      return [];
    }
    return [];
  });

const getFunctionVaryingStrings = (
  config: ParameterConfig[],
  functions: ShaderFunction[]
) => {
  const functionVaryings = config.filter(
    ({ varyingConfig }) =>
      varyingConfig?.varyingType === VARYING_TYPES.FUNCTION &&
      varyingConfig?.functionId
  );
  if (!functionVaryings.length) return [];
  const strings = [];
  // functionVaryings.forEach((item: ParameterConfig) => {
  //   const function = functions.find((func) => func.id === item.varyingConfig?.functionId);
  //   if (function) {
  //     strings.push(`${item.id} = ${function.functionName};`);
  //   }
  // });
  return strings;
};
