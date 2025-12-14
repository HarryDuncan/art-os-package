/* eslint-disable @typescript-eslint/ban-ts-comment */

import { ASSET_TYPES } from "../../../../assets/consts";
import { Asset } from "../../../../assets/types";
import { AssetToUniformMappingConfig } from "../../types";
import { UniformObject } from "../generator/types";
import { ASSET_MAPPING_RELATIONSHIPS } from "../schema";
import {
  Vector2,
  VideoTexture,
  LinearFilter,
  RGBFormat,
  Texture,
  CanvasTexture,
} from "three";

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

export const STREAM_TEXTURE_CONFIG_ID = "stream-texture-config";
export const STREAM_TEXTURE_DIMENSION_ID = "stream-texture-dimension";

const getMappedAsset = (
  assetMapping: AssetToUniformMappingConfig,
  assets: Asset[]
) => {
  const mappedAsset = assets.find(
    (asset) => asset.guid === assetMapping.assetId
  );

  if (assetMapping.assetId === STREAM_TEXTURE_CONFIG_ID) {
    const canvas = document.getElementById(
      "test-stream-canvas"
    ) as HTMLCanvasElement;
    if (!canvas) {
      console.warn("Stream canvas not found, creating placeholder texture");
      return new Texture(); // Return empty texture if canvas not ready
    }

    // VideoTexture works with canvas elements too and auto-updates!
    const canvasTexture = new CanvasTexture(canvas);
    canvasTexture.minFilter = LinearFilter;
    canvasTexture.magFilter = LinearFilter;
    canvasTexture.format = RGBFormat;

    return canvasTexture;
  }

  if (assetMapping.assetId === STREAM_TEXTURE_DIMENSION_ID) {
    const canvas = document.getElementById(
      "test-stream-canvas"
    ) as HTMLCanvasElement;
    if (!canvas) {
      return new Vector2(320, 180); // Default dimensions
    }
    const width = canvas.width / 2;
    const height = canvas.height / 2;

    return new Vector2(width, height);
  }

  if (mappedAsset && mappedAsset.data) {
    switch (assetMapping.relationship) {
      case ASSET_MAPPING_RELATIONSHIPS.TEXTURE: {
        if (mappedAsset.assetType === ASSET_TYPES.VIDEO) {
          const video = document.getElementById(mappedAsset.guid);
          const videoTexture = new VideoTexture(video as HTMLVideoElement);
          videoTexture.minFilter = LinearFilter;
          videoTexture.magFilter = LinearFilter;
          videoTexture.format = RGBFormat;
          return videoTexture;
        } else {
          const texture = mappedAsset.data;
          return texture;
        }
      }
      case ASSET_MAPPING_RELATIONSHIPS.VIDEO: {
        const video = document.getElementById(mappedAsset.guid);
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
        if (mappedAsset.assetType === ASSET_TYPES.VIDEO) {
          const video = document.getElementById(
            mappedAsset.guid
          ) as HTMLVideoElement;
          const width = video?.videoWidth;
          const height = video?.videoHeight;

          return new Vector2(width, height);
        } else {
          // @ts-ignore
          const { width, height } = mappedAsset.data.image;
          return new Vector2(width, height);
        }
      }

      default:
        console.warn(`No configuration for ${assetMapping.relationship}`);
        return null;
    }
  }
  console.warn(`no mapped asset found for ${assetMapping.assetId}`);
};
