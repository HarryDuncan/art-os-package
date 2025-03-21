import { DstAlphaFactor, DstColorFactor, OneFactor, OneMinusDstAlphaFactor, OneMinusDstColorFactor, OneMinusSrcAlphaFactor, OneMinusSrcColorFactor, SrcAlphaFactor, SrcAlphaSaturateFactor, SrcColorFactor, ZeroFactor, } from "three";
import { BLENDING_DIST, BLENDING_SRC } from "./blendingOptions.consts";
export const getBlendingFactor = (blendMode) => {
    switch (blendMode) {
        case BLENDING_DIST.ZERO:
            return ZeroFactor;
        case BLENDING_DIST.ONE:
            return OneFactor;
        case BLENDING_DIST.SRC_COLOR:
            return SrcColorFactor;
        case BLENDING_DIST.ONE_MINUS_SRC_COLOR:
            return OneMinusSrcColorFactor;
        case BLENDING_DIST.SRC_ALPHA:
            return SrcAlphaFactor;
        case BLENDING_DIST.ONE_MINUS_SRC_ALPHA:
            return OneMinusSrcAlphaFactor;
        case BLENDING_DIST.DST_ALPHA:
            return DstAlphaFactor;
        case BLENDING_DIST.ONE_MINUS_DST_ALPHA:
            return OneMinusDstAlphaFactor;
        case BLENDING_DIST.DST_COLOR:
            return DstColorFactor;
        case BLENDING_DIST.ONE_MINUS_DST_COLOR:
            return OneMinusDstColorFactor;
        case BLENDING_SRC.SRC_ALPHA_SATURATE:
            return SrcAlphaSaturateFactor;
        default:
            console.error("Unknown blending mode:", blendMode);
    }
};
export const getBlendingDstFactor = (blendMode) => {
    switch (blendMode) {
        case BLENDING_DIST.ZERO:
            return ZeroFactor;
        case BLENDING_DIST.ONE:
            return OneFactor;
        case BLENDING_DIST.SRC_COLOR:
            return SrcColorFactor;
        case BLENDING_DIST.ONE_MINUS_SRC_COLOR:
            return OneMinusSrcColorFactor;
        case BLENDING_DIST.SRC_ALPHA:
            return SrcAlphaFactor;
        case BLENDING_DIST.ONE_MINUS_SRC_ALPHA:
            return OneMinusSrcAlphaFactor;
        case BLENDING_DIST.DST_ALPHA:
            return DstAlphaFactor;
        case BLENDING_DIST.ONE_MINUS_DST_ALPHA:
            return OneMinusDstAlphaFactor;
        case BLENDING_DIST.DST_COLOR:
            return DstColorFactor;
        case BLENDING_DIST.ONE_MINUS_DST_COLOR:
            return OneMinusDstColorFactor;
        default:
            console.error("Unknown blending mode:", blendMode);
    }
};
