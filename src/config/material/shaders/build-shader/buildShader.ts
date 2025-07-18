import { MAIN_END, MAIN_START } from "./constants/buildShader.consts";
import { setUpFragmentEffects } from "./fragment-effects/setUpFragmentEffects";
import { buildAttributes } from "./shader-properties/attributes/buildAttributes";
import { buildUniformDeclaration } from "./shader-properties/uniforms/buildUniformDeclaration";
import { buildVaryings } from "./shader-properties/varyings/buildVaryings";
import { setUpVertexEffects } from "./vertex-effects/setUpVertexEffects";
// import { buildStruct } from "./shader-properties/structs/buildStructs";
// import { mergeStructConfigs } from "./shader-properties/structs/mergeStructConfigs";
import {
  OperatorConfig,
  ShaderEffectConfig,
  ShaderFunction,
  ShaderParameterMap,
} from "./buildShader.types";
import { formatShaderEffects } from "./helpers/formatEffectConfigs";
import {
  VERTEX_NORMAL_INSTANTIATION,
  VERTEX_POINT_INSTANTIATION,
} from "./vertex-effects/vertexEffects.consts";
import { formatFunctionDeclarations } from "./helpers/formatFunctionDeclarations";
import { FRAG_COLOR_INSTANTIATION } from "./fragment-effects/fragmentEffects.consts";
import { generateConstantDeclarations } from "./shader-properties/constants/constantDeclarations";
import { mergeShaderFunctions } from "./helpers/mergeShaderFunctions";

const DEBUG = true;
export const buildShader = (
  shaderEffectConfigs: ShaderEffectConfig[],
  operatorConfigs: OperatorConfig[],
  parameterMap: ShaderParameterMap
) => {
  const attributes = buildAttributes(parameterMap);
  const uniformDeclaration = buildUniformDeclaration(parameterMap);

  const {
    varyingDeclaration,
    varyingInstantiation,
    varyingFunctionDeclarations,
  } = buildVaryings(parameterMap);
  const constantDeclarations = generateConstantDeclarations(parameterMap);

  const { vertexEffectFunctions, fragmentEffectFunctions } =
    formatShaderEffects(shaderEffectConfigs, operatorConfigs);

  const fragmentEffects = setUpFragmentEffects(
    fragmentEffectFunctions as OperatorConfig[],
    parameterMap
  );
  const vertexEffects = setUpVertexEffects(vertexEffectFunctions, parameterMap);

  // const shaderStructConfigs = [structConfigs ?? []];
  // const mergedStructConfig = mergeStructConfigs(shaderStructConfigs);
  // const structDeclaration = buildStruct(mergedStructConfig);
  // @ ts-ignore
  const vertexEffectFunctionDefinitions = mergeShaderFunctions([
    vertexEffects.requiredFunctions,
    varyingFunctionDeclarations,
  ]);

  const vertexShader = formatVertexShader(
    // structDeclaration,
    attributes,
    uniformDeclaration,
    varyingDeclaration,
    constantDeclarations,
    varyingInstantiation,
    vertexEffectFunctionDefinitions,
    vertexEffects.transformations,
    vertexEffects.viewMatrix
  );

  const fragmentShader = formatFragmentShader(
    //  structDeclaration,
    uniformDeclaration,
    varyingDeclaration,
    constantDeclarations,
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
  varyingInstantiations: string[],
  vertexFunctions: ShaderFunction[],
  vertexTransformations: string,
  viewMatrix: string
) => {
  const vertexFunctionDeclarations =
    formatFunctionDeclarations(vertexFunctions);
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
    vertexTransformations,
    viewMatrix,
    varyingInstantiations.join("\n"),
    MAIN_END,
  ].join(" \n ");
};

export const formatFragmentShader = (
  // structDeclaration: string,
  uniformDeclaration: string,
  varyingDeclarations: string[],
  constantDeclarations: string,
  fragmentFunctions: ShaderFunction[],
  fragmentTransformations: string,
  fragColor: string
) => {
  const fragmentFunctionDeclarations =
    formatFunctionDeclarations(fragmentFunctions);
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
