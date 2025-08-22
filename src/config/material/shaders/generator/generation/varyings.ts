import {
  ParameterConfig,
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
  VARYING_TYPES,
} from "../../schema";
import {
  V_CUSTOM_INSTANTIATION,
  V_DEFAULT_INSTANTIATION,
  V_DECLARATION,
  VERTEX_NORMAL_NAME,
  VERTEX_POINT_NAME,
} from "../consts";
import { ShaderParameterMap } from "../types";
import { generateDeclaration } from "./helpers/generateDeclaration";
import { getDefaultValueAsString } from "./helpers/shaderValues";
import { transformsFromParameters } from "./transforms/transformsFromParameters";

export const generateVaryings = (parameterMap: ShaderParameterMap) => {
  const varyingConfigs = Array.from(parameterMap.values()).filter(
    (parameter) => parameter.parameterType === SHADER_PROPERTY_TYPES.VARYING
  );

  const declaration = varyingDeclarations(varyingConfigs);
  const instantiation = varyingInstantiation(varyingConfigs);
  const { functionInstantiations, varyingFunctions } = getFunctionVarying(
    varyingConfigs,
    parameterMap
  );
  return {
    varyingDeclaration: declaration,
    varyingInstantiation: [...instantiation, ...functionInstantiations],
    varyingFunctionDeclarations: varyingFunctions,
  };
};

const varyingDeclarations = (config: ParameterConfig[]) => {
  const declarationStrings = config.map(({ key, valueType }) =>
    generateDeclaration(
      SHADER_PROPERTY_TYPES.VARYING as keyof typeof SHADER_PROPERTY_TYPES,
      valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES,
      key
    )
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
        strings.push(`vPosition = ${VERTEX_POINT_NAME};`);
        break;
      case "vNormal":
        strings.push(
          `vNormal = normalMatrix *  vec3(${VERTEX_NORMAL_NAME}.xyz);`
        );
        break;
      case "vViewDirection":
        strings.push(
          `vec4 viewPos = modelViewMatrix * vec4(${VERTEX_POINT_NAME}.xyz, 1.0);`
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
      // case "vEye":
      //   strings.push(
      //     `vEye = normalize(vec3(modelViewMatrix * vec4(${VERTEX_POINT_NAME}.xyz, 1.0)));`
      //   );
      //   break;
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
  config: ParameterConfig[],
  parameterMap: ShaderParameterMap
) => {
  const { functionInstantiations, transformFunctions } =
    transformsFromParameters(config, parameterMap);
  return { functionInstantiations, varyingFunctions: transformFunctions };
};
