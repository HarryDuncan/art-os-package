import { ShaderPropertyTypes } from "../../constants/buildShader.consts";
import {
  DefaultUniform,
  UniformConfig,
  UniformObject,
  UniformValueConfig,
} from "../../types";
import { createDeclarationString } from "../../helpers/createDeclarationString";
import { setUpCustomPropertyValues } from "../../helpers/getShaderPropertyValues";
import { getResolution } from "./helpers/getResolution";
import { UNIFORM_DECLARATION } from "./uniforms.consts";
import { DEFAULT_UNIFORMS } from "../../constants";

export const buildUniforms = (uniformConfig: UniformConfig) => {
  const { defaultUniforms, defaultStrings } = setUpDefaultUniforms(
    uniformConfig.defaultUniforms
  );
  const { customUniforms, customStrings } = setUpCustom(
    uniformConfig?.customUniforms
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
    const defaultUniform = DEFAULT_UNIFORMS[uniformKey];
    if (!defaultUniform) {
      console.warn(`uniform configuration not set for ${uniformKey}`);
    } else {
      const uniformString = createDeclarationString(
        ShaderPropertyTypes.UNIFORM,
        defaultUniform.valueType,
        uniformKey
      );
      const uniformValue = getDefaultUniformValue(uniformKey);
      defaultUniforms[uniformKey] = { value: uniformValue };
      defaultStrings.push(uniformString);
    }
  });
  return { defaultUniforms, defaultStrings };
};

const setUpCustom = (config: UniformValueConfig[] = []) => {
  const { customProperties, customStrings } = setUpCustomPropertyValues(
    config,
    ShaderPropertyTypes.UNIFORM as ShaderPropertyTypes
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
