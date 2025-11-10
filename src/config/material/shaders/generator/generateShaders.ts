import {
  DefinedEffectFunction,
  ShaderFunction,
  ShaderParameterMap,
  TransformDefinition,
} from "./types";
import { generateAttributes } from "./generation/attributes";
import { generateUniformDeclaration } from "./generation/uniforms";
import { generateVaryings } from "./generation/varyings";
import { generateFragmentEffect } from "./generation/fragment";
import { generateVertexEffect } from "./generation/vertex";
import { EffectConfig, OperatorConfig, StructConfig } from "../schema";
import { generateConstants } from "./generation/constants";
import { functionDeclarations } from "./generation/functions";
import {
  FRAG_COLOR_INSTANTIATION,
  MAIN_END,
  MAIN_START,
  VERTEX_NORMAL_INSTANTIATION,
  VERTEX_POINT_INSTANTIATION,
} from "./consts";
import { generateStructs } from "./generation/structs";

const DEBUG = true;
export const generateShaders = (
  vertexEffectsConfigs: OperatorConfig[],
  fragmentEffectsConfigs: OperatorConfig[],
  functionConfigs: EffectConfig[],
  parameterMap: ShaderParameterMap,
  structsConfigs: StructConfig[]
) => {
  console.log(parameterMap);
  const attributes = generateAttributes(parameterMap);
  const uniformDeclaration = generateUniformDeclaration(parameterMap);
  const { structDeclaration, structInstantiation } =
    generateStructs(structsConfigs);
  const {
    varyingDeclaration,
    varyingInstantiation,
    varyingTransformDefinitions,
    //  varyingFunctionDeclarations,
  } = generateVaryings(parameterMap, functionConfigs);
  const {
    constantDeclaration,
    constantInstantiation,
    //  constantFunctionDeclarations,
  } = generateConstants(parameterMap);

  const fragmentEffects = generateFragmentEffect(
    fragmentEffectsConfigs,
    parameterMap
  );
  const vertexEffects = generateVertexEffect(
    vertexEffectsConfigs,
    parameterMap
  );

  const vertexTransformDefinitions = [
    ...vertexEffects.transformDefinitions,
    ...varyingTransformDefinitions,
    // ...varyingFunctionDeclarations,
    // ...constantFunctionDeclarations,
  ];

  const vertexShader = formatVertexShader(
    structDeclaration,
    attributes,
    uniformDeclaration,
    varyingDeclaration,
    constantDeclaration,
    constantInstantiation,
    structInstantiation,
    varyingInstantiation,
    vertexTransformDefinitions,
    vertexEffects.transformations,
    vertexEffects.viewMatrix
  );

  const fragmentShader = formatFragmentShader(
    structDeclaration,
    uniformDeclaration,
    varyingDeclaration,
    constantDeclaration,
    structInstantiation,
    fragmentEffects.transformDefinitions,
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
  structDeclaration: string,
  attributes: string,
  uniformDeclarations: string,
  varyingDeclarations: string[],
  constantDeclarations: string,
  constantInstantiations: string[],
  structInstantiation: string,
  varyingInstantiations: string[],
  vertexTransformDefinitions: TransformDefinition[],
  vertexTransformations: string,
  viewMatrix: string
) => {
  const vertexFunctionDeclarations = functionDeclarations(
    vertexTransformDefinitions
  );
  return [
    structDeclaration,
    attributes,
    uniformDeclarations,
    varyingDeclarations.join("\n"),
    constantDeclarations,
    vertexFunctionDeclarations,
    MAIN_START,
    VERTEX_POINT_INSTANTIATION,
    VERTEX_NORMAL_INSTANTIATION,
    constantInstantiations.join("\n"),
    structInstantiation,
    vertexTransformations,
    viewMatrix,
    varyingInstantiations.join("\n"),
    MAIN_END,
  ].join(" \n ");
};

export const formatFragmentShader = (
  structDeclaration: string,
  uniformDeclaration: string,
  varyingDeclarations: string[],
  constantDeclarations: string,
  structInstantiation: string,
  fragmentTransformDefinitions: TransformDefinition[],
  fragmentTransformations: string,
  fragColor: string
) => {
  const fragmentFunctionDeclarations = functionDeclarations(
    fragmentTransformDefinitions
  );
  const shaderCodeArray: string[] = [
    structDeclaration,
    uniformDeclaration,
    varyingDeclarations.join("\n"),
    constantDeclarations,
    structInstantiation,
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
