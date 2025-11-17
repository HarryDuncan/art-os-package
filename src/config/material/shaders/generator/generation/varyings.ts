import {
  EffectConfig,
  ParameterConfig,
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
  SHADER_VARIABLE_TYPES,
  VARYING_TYPES,
} from "../../schema";
import { filterParametersByType } from "../../utils";
import {
  V_CUSTOM_INSTANTIATION,
  V_DEFAULT_INSTANTIATION,
  V_DECLARATION,
} from "../consts";
import { ShaderParameterMap } from "../types";
import { generateDeclaration } from "./helpers/generateDeclaration";
import { getDefaultValueAsString } from "./helpers/shaderValues";
import { getTransformsMappedToParameters } from "./transforms/getTransfomsMappedToParameters";

export const generateVaryings = (
  parameterMap: ShaderParameterMap,
  functionConfigs: EffectConfig[]
) => {
  const varyingConfigs = filterParametersByType(
    parameterMap,
    SHADER_PROPERTY_TYPES.VARYING
  );

  const declaration = varyingDeclarations(varyingConfigs);
  const instantiation = varyingInstantiation(varyingConfigs);
  const { transformDefinitions, transformAssignments } = getFunctionVarying(
    varyingConfigs,
    parameterMap,
    functionConfigs
  );
  return {
    varyingDeclaration: declaration,
    varyingInstantiation: [...instantiation, ...transformAssignments],
    varyingTransformDefinitions: transformDefinitions,
  };
};

const varyingDeclarations = (config: ParameterConfig[]) => {
  const declarationStrings = config.map(
    ({ key, valueType, varyingConfig, isFunctionBased }) => {
      const options = {
        flat:
          varyingConfig?.varyingType === VARYING_TYPES.ATTRIBUTE ||
          isFunctionBased,
      };
      return generateDeclaration(
        SHADER_PROPERTY_TYPES.VARYING as keyof typeof SHADER_PROPERTY_TYPES,
        valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES,
        key,
        options
      );
    }
  );
  const declaration = [V_DECLARATION, ...declarationStrings];
  return declaration;
};

const varyingInstantiation = (varyingConfigs: ParameterConfig[]) => {
  const defaultVaryingStrings = getDefaultVaryingString(varyingConfigs);
  const attributeVaryingStrings = getAttributeVaryingStrings(varyingConfigs);
  const customVaryingsStrings = getCustomVaryingStrings(varyingConfigs);

  return [
    ...defaultVaryingStrings,
    ...attributeVaryingStrings,
    ...customVaryingsStrings,
  ];
};

const getDefaultVaryingString = (config: ParameterConfig[]) => {
  const defaultVaryings: ParameterConfig[] = config.filter(
    (item) => item.varyingConfig?.varyingType === VARYING_TYPES.DEFAULT
  );
  if (!defaultVaryings.length) return [];
  const strings = [V_DEFAULT_INSTANTIATION];
  defaultVaryings.forEach((item: ParameterConfig) => {
    switch (item.key) {
      case "vUv":
        strings.push("vUv = uv;");
        break;
      case "vPosition":
        strings.push(`vPosition = ${SHADER_VARIABLE_TYPES.VERTEX_POINT};`);
        break;
      case "vNormal":
        strings.push(
          `vNormal = normalMatrix *  vec3(${SHADER_VARIABLE_TYPES.NORMAL}).xyz;`
        );
        break;
      case "vViewDirection":
        strings.push(
          `vec4 viewPos = modelViewMatrix * vec4(${SHADER_VARIABLE_TYPES.VERTEX_POINT}.xyz, 1.0);`
        );
        strings.push(`vViewDirection = normalize(-viewPos.xyz);`);
        break;
      // case "vModelViewMatrix":
      //   strings.push("vModelViewMatrix = modelViewMatrix;");
      //   break;
      // case "vNormalInterpolation":
      //   strings.push(
      //     `vNormalInterpolation = normalize(normalMatrix  * ${VERTEX_NORMAL_NAME}.xyz);`
      //   );
      //   break;
      // case "vTexCoord":
      //   strings.push(`vTexCoord = texcoord;`);
      //   break;
      // case "vGeometryNormal":
      //   strings.push(`vGeometryNormal = ${VERTEX_NORMAL_NAME}.xyz`);
      //   break;
      case "vCamera":
        strings.push(
          `vCamera = normalize(vec3(modelViewMatrix * vec4(${SHADER_VARIABLE_TYPES.VERTEX_POINT}.xyz, 1.0)));`
        );
        break;
      default:
        console.warn(`nothing made for default varying ${item.key}`);
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
      `${item.key} = ${
        item.value ??
        getDefaultValueAsString(
          item.valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES
        )
      };`
    );
  });
  return strings;
};

const getAttributeVaryingStrings = (config: ParameterConfig[]) =>
  config.flatMap(({ key, varyingConfig }) => {
    if (varyingConfig?.varyingType === VARYING_TYPES.ATTRIBUTE) {
      return `${key} = ${varyingConfig?.attributeKey};`;
    }
    return [];
  });

const getFunctionVarying = (
  assignedParameters: ParameterConfig[],
  parameterMap: ShaderParameterMap,
  functionConfigs: EffectConfig[]
) => {
  const configuredTransforms = getTransformsMappedToParameters(
    assignedParameters,
    parameterMap,
    functionConfigs
  );
  const transformDefinitions = configuredTransforms.flatMap(
    (transform) => transform.transformDefinitions
  );
  const transformAssignments = configuredTransforms.flatMap(
    ({ transformAssignments }) => transformAssignments
  );
  return { transformDefinitions, transformAssignments };
};
