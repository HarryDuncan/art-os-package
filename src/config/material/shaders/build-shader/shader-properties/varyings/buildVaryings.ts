import {
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../constants/shader.consts";
import { createDeclarationString } from "../../helpers/createDeclarationString";
import { getDefaultValueAsString } from "../../helpers/getDefaultValue";
import { VARYING_TYPES } from "./varyings.consts";
import {
  VERTEX_NORMAL_NAME,
  VERTEX_POINT_NAME,
} from "../../vertex-effects/vertexEffects.consts";
import {
  ParameterConfig,
  ShaderEffectConfig,
  ShaderParameterMap,
} from "../../buildShader.types";
import {
  V_CUSTOM_INSTANTIATION,
  V_DECLARATION,
  V_DEFAULT_INSTANTIATION,
} from "../../constants";
import { transformationConfigFromFunctionParameter } from "../../helpers/generate-transform/setupShaderTransformConfigs";
import { transformationToFunction } from "../../helpers/generate-transform/transformationToFunction";
import { setUpFunctionInstantiation } from "../../helpers/generate-transform/functions";

export const buildVaryings = (parameterMap: ShaderParameterMap) => {
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
    createDeclarationString(
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
          `vNormal = (modelMatrix *  vec4(${VERTEX_NORMAL_NAME})).xyz;`
        );
        break;
      case "vViewDirection":
        strings.push(
          `vViewDirection = normalize(vec3(modelViewMatrix * vec4(${VERTEX_POINT_NAME})));`
        );
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
  const functionVaryings = config.filter((item) => item.isFunctionBased);
  const transformations = functionVaryings.flatMap((item) => {
    return transformationConfigFromFunctionParameter(item, parameterMap) ?? [];
  });
  const varyingFunctions = transformationToFunction(transformations, {
    id: "effectId",
  } as unknown as ShaderEffectConfig);

  const functionInstantiations = varyingFunctions.flatMap(
    ({ assignedVariableId, functionName, inputMap, returnValue }) => {
      return setUpFunctionInstantiation(
        assignedVariableId as string,
        functionName,
        inputMap,
        returnValue,
        "effectId"
      );
    }
  );

  return { functionInstantiations, varyingFunctions };
};
