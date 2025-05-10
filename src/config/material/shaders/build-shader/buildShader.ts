import {
  FRAG_COLOR_INSTANTIATION,
  MAIN_END,
  MAIN_START,
  VERTEX_NORMAL_INSTANTIATION,
  VERTEX_POINT_INSTANTIATION,
} from "./constants/buildShader.consts";
import { setUpFragmentEffects } from "./fragment-effects/setUpFragmentEffects";
import { buildAttributes } from "./shader-properties/attributes/buildAttributes";
import { mergeAttributeConfigs } from "./shader-properties/attributes/helpers/mergeAttributeConfigs";
import { buildUniforms } from "./shader-properties/uniforms/buildUniforms";
import { mergeUniformConfigs } from "./shader-properties/uniforms/helpers/mergeUniformConfigs";
import { EMPTY_UNIFORM_CONFIG } from "./shader-properties/uniforms/uniforms.consts";
import { buildVaryings } from "./shader-properties/varyings/buildVaryings";
import { mergeVaryingConfigs } from "./shader-properties/varyings/helpers/mergeVaryingConfigs";
import { setUpVertexEffects } from "./vertex-effects/setUpVertexEffects";
import { buildStruct } from "./shader-properties/structs/buildStructs";
import { mergeStructConfigs } from "./shader-properties/structs/mergeStructConfigs";
import {
  AttributeConfig,
  BuiltShaderConfig,
  ShaderFunction,
  UniformConfig,
  VaryingConfig,
} from "./buildShader.types";

const DEBUG = false;
export const buildShader = (shaderConfig: BuiltShaderConfig) => {
  const {
    vertexEffectConfigs,
    fragmentEffectConfigs,
    uniformConfig,
    varyingConfig,
    attributeConfig,
    structConfigs,
  } = shaderConfig;

  const configuredUniformConfig = {
    ...(uniformConfig ?? { ...EMPTY_UNIFORM_CONFIG }),
  };
  const fragmentEffects = setUpFragmentEffects(
    fragmentEffectConfigs,
    configuredUniformConfig
  );
  const vertexEffects = setUpVertexEffects(
    vertexEffectConfigs,
    configuredUniformConfig
  );

  // pass the parsed uniform config first so the values override any values defined in the other effects - vertex/fragment
  const shaderUniforms: UniformConfig[] = [
    uniformConfig ?? { ...EMPTY_UNIFORM_CONFIG },
    vertexEffects.uniformConfigs,
    fragmentEffects.uniformConfigs,
  ];

  const mergedShaderUniforms = mergeUniformConfigs(shaderUniforms);

  const shaderAttributes = [
    attributeConfig,
    fragmentEffects.attributeConfigs,
    vertexEffects.attributeConfigs,
  ] as AttributeConfig[][];
  const combinedAttributeConfigs = mergeAttributeConfigs(shaderAttributes);
  const attributes = buildAttributes(combinedAttributeConfigs);

  const shaderVaryings = [
    vertexEffects.varyingConfigs,
    fragmentEffects.varyingConfigs,
    varyingConfig ?? [],
  ];
  const mergedShaderVaryings = mergeVaryingConfigs(
    shaderVaryings
  ) as VaryingConfig[];

  const { uniforms, uniformDeclaration } = buildUniforms(mergedShaderUniforms);
  const {
    declaration: varyingDeclaration,
    instantiation: varyingInstantiation,
  } = buildVaryings(mergedShaderVaryings, combinedAttributeConfigs);

  const shaderStructConfigs = [
    vertexEffects.structConfigs,
    fragmentEffects.structConfigs,
    structConfigs ?? [],
  ];
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
    uniforms,
    attributeConfigs: combinedAttributeConfigs,
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
  return [
    structDeclaration,
    attributes,
    uniformDeclarations,
    varyingDeclaration,
    vertexFunctions
      .map(({ functionDefinition }) => functionDefinition)
      .join(""),
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
