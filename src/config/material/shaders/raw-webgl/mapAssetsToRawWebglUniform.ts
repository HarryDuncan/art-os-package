import { ASSET_TYPES } from "../../../../assets/consts";
import { Asset } from "../../../../assets/types";
import { AssetToUniformMappingConfig } from "../../types";
import { ASSET_MAPPING_RELATIONSHIPS } from "../schema";
import {
  RawWebglTextureBinding,
  RawWebglTextureRelationship,
  RawWebglUniformObject,
} from "./types";

export const STREAM_TEXTURE_CONFIG_ID = "stream-texture-config";
export const STREAM_TEXTURE_DIMENSION_ID = "stream-texture-dimension";

export const mapAssetsToRawWebglUniforms = (
  assetMapping: AssetToUniformMappingConfig[],
  assets: Asset[],
  uniforms: RawWebglUniformObject = {},
): {
  uniforms: RawWebglUniformObject;
  textureBindings: RawWebglTextureBinding[];
} => {
  const textureBindings: RawWebglTextureBinding[] = [];
  if (!assetMapping) return { uniforms, textureBindings };

  assetMapping.forEach((mapping) => {
    const result = resolveMapping(mapping, assets);
    if (!result) return;
    if (result.kind === "texture") {
      textureBindings.push(result.binding);
    } else {
      uniforms[mapping.uniformId] = { value: result.value };
    }
  });

  return { uniforms, textureBindings };
};

type ResolvedMapping =
  | { kind: "texture"; binding: RawWebglTextureBinding }
  | { kind: "uniform"; value: number[] };

const resolveMapping = (
  assetMapping: AssetToUniformMappingConfig,
  assets: Asset[],
): ResolvedMapping | null => {
  const { uniformId, assetId, relationship } = assetMapping;

  if (assetId === STREAM_TEXTURE_CONFIG_ID) {
    return {
      kind: "texture",
      binding: { uniformId, assetId, relationship: "video_stream" },
    };
  }

  if (assetId === STREAM_TEXTURE_DIMENSION_ID) {
    const canvas = document.getElementById(
      "test-stream-canvas",
    ) as HTMLCanvasElement | null;
    if (!canvas) {
      return { kind: "uniform", value: [320, 180] };
    }
    return { kind: "uniform", value: [canvas.width / 2, canvas.height / 2] };
  }

  const mappedAsset = assets.find((asset) => asset.guid === assetId);
  if (!mappedAsset || !mappedAsset.data) {
    console.warn(`no mapped asset found for ${assetId}`);
    return null;
  }

  switch (relationship) {
    case ASSET_MAPPING_RELATIONSHIPS.TEXTURE: {
      const isVideo = mappedAsset.assetType === ASSET_TYPES.VIDEO;
      const textureRelationship: RawWebglTextureRelationship = isVideo
        ? "video"
        : "texture";
      return {
        kind: "texture",
        binding: { uniformId, assetId, relationship: textureRelationship },
      };
    }
    case ASSET_MAPPING_RELATIONSHIPS.VIDEO: {
      return {
        kind: "texture",
        binding: { uniformId, assetId, relationship: "video" },
      };
    }
    case ASSET_MAPPING_RELATIONSHIPS.VIDEO_STREAM: {
      return {
        kind: "texture",
        binding: { uniformId, assetId, relationship: "video_stream" },
      };
    }
    case ASSET_MAPPING_RELATIONSHIPS.DIMENSION: {
      if (mappedAsset.assetType === ASSET_TYPES.VIDEO) {
        const video = document.getElementById(
          mappedAsset.guid,
        ) as HTMLVideoElement | null;
        return {
          kind: "uniform",
          value: [video?.videoWidth ?? 0, video?.videoHeight ?? 0],
        };
      }
      const data = mappedAsset.data as { width?: number; height?: number };
      const width = typeof data.width === "number" ? data.width : 0;
      const height = typeof data.height === "number" ? data.height : 0;
      return { kind: "uniform", value: [width, height] };
    }
    default: {
      console.warn(`No raw-webgl configuration for ${relationship}`);
      return null;
    }
  }
};
