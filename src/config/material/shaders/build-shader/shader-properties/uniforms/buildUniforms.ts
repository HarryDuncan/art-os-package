import {
  DEFAULT_UNIFORMS,
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../constants/shader.consts";
import { createDeclarationString } from "../../helpers/createDeclarationString";
import { setUpCustomPropertyValues } from "../../helpers/getShaderPropertyValues";
import { getResolution } from "./helpers/getResolution";
import { UNIFORM_DECLARATION } from "./uniforms.consts";

import {
  UniformConfig,
  DefaultUniform,
  UniformObject,
  UniformValueConfig,
  InteractionMappedUniform,
} from "../../../../../../types/materials/index";

export const buildUniforms = (uniformConfig: UniformConfig) => {
  console.log("uniformConfig", uniformConfig);
  const { defaultUniforms, defaultStrings } = setUpDefaultUniforms(
    uniformConfig.defaultUniforms
  );
  const { customUniforms, customStrings } = setUpCustom(
    uniformConfig?.customUniforms ?? []
  );
  const uniforms = { ...defaultUniforms, ...customUniforms };
  const uniformDeclaration = [
    UNIFORM_DECLARATION,
    ...defaultStrings,
    ...customStrings,
  ].join(" \n ");
  return { uniforms, uniformDeclaration };
};

const setUpDefaultUniforms = (uniformConfig: DefaultUniform[]) => {
  const defaultUniforms: UniformObject = { uTime: { value: 0.0 } };
  const defaultStrings = [`uniform float uTime;`];
  uniformConfig.forEach((uniformKey) => {
    const defaultUniform =
      DEFAULT_UNIFORMS[uniformKey as keyof typeof DEFAULT_UNIFORMS];
    if (!defaultUniform) {
      console.warn(`uniform configuration not set for ${String(uniformKey)}`);
    } else {
      const uniformString = createDeclarationString(
        SHADER_PROPERTY_TYPES.UNIFORM as keyof typeof SHADER_PROPERTY_TYPES,
        defaultUniform.valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES,
        String(uniformKey)
      );
      const uniformValue = getDefaultUniformValue(String(uniformKey));
      defaultUniforms[String(uniformKey)] = { value: uniformValue };
      defaultStrings.push(uniformString);
    }
  });
  return { defaultUniforms, defaultStrings };
};

const setUpCustom = (
  config: UniformValueConfig[] | InteractionMappedUniform[]
) => {
  const { customProperties, customStrings } = setUpCustomPropertyValues(
    config,
    SHADER_PROPERTY_TYPES.UNIFORM as keyof typeof SHADER_PROPERTY_TYPES
  );
  return { customUniforms: customProperties, customStrings };
};

const getDefaultUniformValue = (uniformKey: string) => {
  switch (uniformKey) {
    case "uResolution":
      return getResolution();
    default:
      return DEFAULT_UNIFORMS[uniformKey as keyof typeof DEFAULT_UNIFORMS]
        .defaultValue;
  }
};
