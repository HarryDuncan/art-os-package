import {
  ASSET_MAPPING_RELATIONSHIPS,
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../../constants";

export const TEXTURE_SIZE = {
  id: "textureSize",
  name: "Texture Size",
  description:
    "The size of the texture - can be mapped to the size of the texture or the size of the mesh",
  parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
  isAssetMapped: true,
  assetMappingConfig: {
    relationship: ASSET_MAPPING_RELATIONSHIPS.DIMENSION,
  },
};

export const CONVERTED_TEXTURE = {
  id: "convertedTexture",
  name: "Converted Texture",
  description:
    "The converted texture - can be mapped to the texture or the texture of the mesh",
  parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  valueType: SHADER_PROPERTY_VALUE_TYPES.SAMPLER2D,
  isAssetMapped: true,
  assetMappingConfig: {
    relationship: ASSET_MAPPING_RELATIONSHIPS.TEXTURE,
  },
};
