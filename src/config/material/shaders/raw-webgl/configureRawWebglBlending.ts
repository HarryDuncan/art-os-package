import { BlendingConfig } from "../../blending-options/types";
import { DEFAULT_BLENDING } from "../../schema";
import { getRawWebglBlendingFactor } from "./getRawWebglBlendingFactor";
import { RawWebglBlending } from "./types";

const DEFAULT_RAW_WEBGL_BLENDING: RawWebglBlending = {
  blendSrc: getRawWebglBlendingFactor(DEFAULT_BLENDING.blendSrcKey),
  blendDst: getRawWebglBlendingFactor(DEFAULT_BLENDING.blendDstKey),
  transparent: DEFAULT_BLENDING.transparent,
  depthTest: DEFAULT_BLENDING.depthTest,
};

export const configureRawWebglBlending = (
  blendingConfig: Partial<BlendingConfig> | undefined,
): RawWebglBlending => {
  if (!blendingConfig) return DEFAULT_RAW_WEBGL_BLENDING;
  const merged = { ...DEFAULT_BLENDING, ...blendingConfig };
  return {
    blendSrc: getRawWebglBlendingFactor(merged.blendSrcKey),
    blendDst: getRawWebglBlendingFactor(merged.blendDstKey),
    transparent: merged.transparent,
    depthTest: merged.depthTest,
  };
};
