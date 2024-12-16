import {
  BLENDING_DIST,
  BLENDING_SRC,
  BLENDING_TYPES,
} from "./blendingOptions.consts";

export type BlendingType = keyof typeof BLENDING_TYPES;
export type BlendingSrc = keyof typeof BLENDING_SRC;
export type BlendingDst = keyof typeof BLENDING_DIST;
export type BlendingConfig = {
  blendingType: BlendingType;
  blendSrcKey: BlendingSrc;
  blendDstKey: BlendingDst;
  transparent: boolean;
  depthTest: boolean;
};
