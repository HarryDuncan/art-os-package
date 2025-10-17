import {
  DefinedEffectFunction,
  ShaderFunction,
  ShaderParameterMap,
} from "./types";
import { generateAttributes } from "./generation/attributes";
import { generateUniformDeclaration } from "./generation/uniforms";
import { generateVaryings } from "./generation/varyings";
import { generateFragmentEffect } from "./generation/fragment";
import { generateVertexEffect } from "./generation/vertex";
import { OperatorConfig } from "../schema";
import { generateConstants } from "./generation/constants";
import { functionDeclarations } from "./generation/functions";
import {
  FRAG_COLOR_INSTANTIATION,
  MAIN_END,
  MAIN_START,
  VERTEX_NORMAL_INSTANTIATION,
  VERTEX_POINT_INSTANTIATION,
} from "./consts";

const DEBUG = true;
export const generateShaders = (
  vertexEffectsConfigs: OperatorConfig[],
  fragmentEffectsConfigs: OperatorConfig[],
  parameterMap: ShaderParameterMap
) => {
  const attributes = generateAttributes(parameterMap);
  const uniformDeclaration = generateUniformDeclaration(parameterMap);

  const {
    varyingDeclaration,
    varyingInstantiation,
    varyingFunctionDeclarations,
  } = generateVaryings(parameterMap);
  const {
    constantDeclaration,
    constantInstantiation,
    constantFunctionDeclarations,
  } = generateConstants(parameterMap);

  const fragmentEffects = generateFragmentEffect(
    fragmentEffectsConfigs,
    parameterMap
  );
  const vertexEffects = generateVertexEffect(
    vertexEffectsConfigs,
    parameterMap
  );

  // const shaderStructConfigs = [structConfigs ?? []];
  // const mergedStructConfig = mergeStructConfigs(shaderStructConfigs);
  // const structDeclaration = buildStruct(mergedStructConfig);
  // @ ts-ignore
  const vertexEffectFunctions = [
    ...vertexEffects.requiredFunctions,
    ...varyingFunctionDeclarations,
    ...constantFunctionDeclarations,
  ];

  const vertexShader = formatVertexShader(
    // structDeclaration,
    attributes,
    uniformDeclaration,
    varyingDeclaration,
    constantDeclaration,
    constantInstantiation,
    varyingInstantiation,
    vertexEffectFunctions,
    vertexEffects.transformations,
    vertexEffects.viewMatrix
  );

  const fragmentShader = formatFragmentShader(
    //  structDeclaration,
    uniformDeclaration,
    varyingDeclaration,
    constantDeclaration,
    fragmentEffects.requiredFunctions,
    fragmentEffects.transformations,
    fragmentEffects.fragColor
  );
  if (DEBUG) {
    console.log("Vertex Shader: ", vertexShader);
    console.log("Fragment Shader: ", fragmentShader);
  }

  return {
    vertexShader,
    fragmentShader,
  };
};

const formatVertexShader = (
  //  structDeclaration: string,
  attributes: string,
  uniformDeclarations: string,
  varyingDeclarations: string[],
  constantDeclarations: string,
  constantInstantiations: string[],
  varyingInstantiations: string[],
  vertexFunctions: (ShaderFunction | DefinedEffectFunction)[],
  vertexTransformations: string,
  viewMatrix: string
) => {
  const vertexFunctionDeclarations = functionDeclarations(vertexFunctions);
  return [
    //   structDeclaration,
    attributes,
    uniformDeclarations,
    varyingDeclarations.join("\n"),
    constantDeclarations,
    vertexFunctionDeclarations,
    MAIN_START,
    VERTEX_POINT_INSTANTIATION,
    VERTEX_NORMAL_INSTANTIATION,
    constantInstantiations.join("\n"),
    vertexTransformations,
    viewMatrix,
    varyingInstantiations.join("\n"),
    MAIN_END,
  ].join(" \n ");
};

export const formatFragmentShader = (
  uniformDeclaration: string,
  varyingDeclarations: string[],
  constantDeclarations: string,
  fragmentFunctions: ShaderFunction[],
  fragmentTransformations: string,
  fragColor: string
) => {
  const fragmentFunctionDeclarations = functionDeclarations(fragmentFunctions);
  const shaderCodeArray: string[] = [
    //   structDeclaration,
    uniformDeclaration,
    varyingDeclarations.join("\n"),
    constantDeclarations,
    fragmentFunctionDeclarations,
    MAIN_START,
    FRAG_COLOR_INSTANTIATION,
    fragmentTransformations,
    fragColor,
    MAIN_END,
  ];
  const filteredShaderCode = shaderCodeArray.filter((str) => str !== "");
  return filteredShaderCode.join(" \n ");
};
