import { MAIN_END, MAIN_START } from "./constants/buildShader.consts";
import { setUpFragmentEffects } from "./fragment-effects/setUpFragmentEffects";
import { buildAttributes } from "./shader-properties/attributes/buildAttributes";
import { buildUniformDeclaration } from "./shader-properties/uniforms/buildUniforms";
import { buildVaryings } from "./shader-properties/varyings/buildVaryings";
import { setUpVertexEffects } from "./vertex-effects/setUpVertexEffects";
import { buildStruct } from "./shader-properties/structs/buildStructs";
import { mergeStructConfigs } from "./shader-properties/structs/mergeStructConfigs";
import { BuiltShaderConfig, ShaderFunction } from "./buildShader.types";
import { formatShaderEffects } from "./helpers/formatEffectConfigs";
import {
  VERTEX_NORMAL_INSTANTIATION,
  VERTEX_POINT_INSTANTIATION,
} from "./vertex-effects/vertexEffects.consts";
import { formatFunctionDeclarations } from "./helpers/formatFunctionDeclarations";
import { FRAG_COLOR_INSTANTIATION } from "./fragment-effects/fragmentEffects.consts";

const DEBUG = true;
export const buildShader = (shaderConfig: BuiltShaderConfig) => {
  const {
    shaderEffectConfigs,
    uniformConfigs,
    varyingConfigs,
    attributeConfigs,
    structConfigs,
  } = shaderConfig;

  const { formattedVertexEffects, formattedFragmentEffects } =
    formatShaderEffects(shaderEffectConfigs);

  const fragmentEffects = setUpFragmentEffects(formattedFragmentEffects);
  const vertexEffects = setUpVertexEffects(formattedVertexEffects);

  const attributes = buildAttributes(attributeConfigs ?? []);

  const uniformDeclaration = buildUniformDeclaration(uniformConfigs ?? []);
  const {
    declaration: varyingDeclaration,
    instantiation: varyingInstantiation,
  } = buildVaryings(
    varyingConfigs ?? [],
    attributeConfigs ?? [],
    vertexEffects.requiredFunctions
  );

  const shaderStructConfigs = [structConfigs ?? []];
  const mergedStructConfig = mergeStructConfigs(shaderStructConfigs);
  const structDeclaration = buildStruct(mergedStructConfig);

  const vertexShader = formatVertexShader(
    structDeclaration,
    attributes,
    uniformDeclaration,
    varyingDeclaration,
    varyingInstantiation,
    vertexEffects.requiredFunctions,
    vertexEffects.transformations,
    vertexEffects.viewMatrix
  );

  const fragmentShader = formatFragmentShader(
    structDeclaration,
    uniformDeclaration,
    varyingDeclaration,
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
  structDeclaration: string,
  attributes: string,
  uniformDeclarations: string,
  varyingDeclaration: string,
  varyingInstantiation: string,
  vertexFunctions: ShaderFunction[],
  vertexTransformations: string,
  viewMatrix: string
) => {
  const vertexFunctionDeclarations =
    formatFunctionDeclarations(vertexFunctions);
  return [
    structDeclaration,
    attributes,
    uniformDeclarations,
    varyingDeclaration,
    vertexFunctionDeclarations,
    MAIN_START,
    VERTEX_POINT_INSTANTIATION,
    VERTEX_NORMAL_INSTANTIATION,
    vertexTransformations,
    varyingInstantiation,
    viewMatrix,
    MAIN_END,
  ].join(" \n ");
};

export const formatFragmentShader = (
  structDeclaration: string,
  uniformDeclaration: string,
  varyingDeclaration: string,
  fragmentFunctions: ShaderFunction[],
  fragmentTransformations: string,
  fragColor: string
) => {
  const shaderCodeArray: string[] = [
    structDeclaration,
    uniformDeclaration,
    varyingDeclaration,
    ...fragmentFunctions.map(({ functionDefinition }) => functionDefinition),
    MAIN_START,
    FRAG_COLOR_INSTANTIATION,
    fragmentTransformations,
    fragColor,
    MAIN_END,
  ];
  const filteredShaderCode = shaderCodeArray.filter((str) => str !== "");
  return filteredShaderCode.join(" \n ");
};
