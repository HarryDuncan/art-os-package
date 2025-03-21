export const BLENDING_TYPES = {
    NO_BLENDING: "NO_BLENDING",
    NORMAL_BLENDING: "NORMAL_BLENDING",
    ADDITIVE_BLENDING: "ADDITIVE_BLENDING",
    SUBTRACTIVE_BLENDING: "SUBTRACTIVE_BLENDING",
    MULTIPLY_BLENDING: "MULTIPLY_BLENDING",
    CUSTOM_BLENDING: "CUSTOM_BLENDING",
};
export const BLENDING_DIST = {
    ZERO: "ZERO",
    ONE: "ONE",
    SRC_COLOR: "SRC_COLOR",
    ONE_MINUS_SRC_COLOR: "ONE_MINUS_SRC_COLOR",
    SRC_ALPHA: "SRC_ALPHA",
    ONE_MINUS_SRC_ALPHA: "ONE_MINUS_SRC_ALPHA",
    DST_ALPHA: "DST_ALPHA",
    ONE_MINUS_DST_ALPHA: "ONE_MINUS_DST_ALPHA",
    DST_COLOR: "DST_COLOR",
    ONE_MINUS_DST_COLOR: "ONE_MINUS_DST_COLOR",
};
export const BLENDING_SRC = {
    ZERO: "ZERO",
    ONE: "ONE",
    SRC_COLOR: "SRC_COLOR",
    ONE_MINUS_SRC_COLOR: "ONE_MINUS_SRC_COLOR",
    SRC_ALPHA: "SRC_ALPHA",
    ONE_MINUS_SRC_ALPHA: "ONE_MINUS_SRC_ALPHA",
    DST_ALPHA: "DST_ALPHA",
    ONE_MINUS_DST_ALPHA: "ONE_MINUS_DST_ALPHA",
    DST_COLOR: "DST_COLOR",
    ONE_MINUS_DST_COLOR: "ONE_MINUS_DST_COLOR",
    SRC_ALPHA_SATURATE: "SRC_ALPHA_SATURATE",
};
export const DEFAULT_BLENDING_OPTIONS = {
    blendingType: BLENDING_TYPES.CUSTOM_BLENDING,
    blendSrcKey: BLENDING_SRC.SRC_ALPHA,
    blendDstKey: BLENDING_DIST.ONE,
    transparent: false,
    depthTest: true,
};
