/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ASSET_MAPPING_RELATIONSHIPS } from "../build-shader/constants/shader.consts";
import { Asset, UniformObject } from "../../../../types";
import { AssetToUniformMappingConfig } from "../../../../types";
import { Vector2, VideoTexture, LinearFilter, RGBFormat, Texture } from "three";

export const mapAssetsToUniforms = (
  assetMapping: AssetToUniformMappingConfig[],
  assets: Asset[],
  uniforms: UniformObject = {}
) => {
  if (assetMapping) {
    assetMapping.forEach((mapping) => {
      const mappedAsset = getMappedAsset(mapping, assets);
      if (mappedAsset) {
        uniforms[mapping.uniformId] = { value: mappedAsset };
      }
    });
  }
  return uniforms;
};

const getMappedAsset = (
  assetMapping: AssetToUniformMappingConfig,
  assets: Asset[]
) => {
  const mappedAsset = assets.find(
    (asset) => asset.guid === assetMapping.assetId
  );
  if (mappedAsset && mappedAsset.data) {
    switch (assetMapping.relationship) {
      case ASSET_MAPPING_RELATIONSHIPS.TEXTURE: {
        const texture = mappedAsset.data;
        return texture;
      }
      case ASSET_MAPPING_RELATIONSHIPS.VIDEO: {
        const video = document.getElementById("video");
        const videoTexture = new VideoTexture(video as HTMLVideoElement);
        videoTexture.minFilter = LinearFilter;
        videoTexture.magFilter = LinearFilter;
        videoTexture.format = RGBFormat;
        return videoTexture;
      }
      case ASSET_MAPPING_RELATIONSHIPS.VIDEO_STREAM: {
        return new Texture();
      }

      case ASSET_MAPPING_RELATIONSHIPS.DIMENSION: {
        // @ts-ignore
        const { width, height } = mappedAsset.data.image;
        return new Vector2(width, height);
      }
      default:
        console.warn(`No configuration for ${assetMapping.relationship}`);
        return null;
    }
  }
  console.warn(`no mapped asset found for ${assetMapping.assetId}`);
};
