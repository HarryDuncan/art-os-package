// Stable WebGL numeric blend factor constants. Mirrors the entries in
// `BLENDING_DIST` / `BLENDING_SRC` so callers can pass either a src or dst
// blending key. These values match `WebGLRenderingContext.*` constants and
// are identical across browsers, so we avoid taking a `gl` context here.
const FACTORS: Record<string, number> = {
  ZERO: 0,
  ONE: 1,
  SRC_COLOR: 0x0300,
  ONE_MINUS_SRC_COLOR: 0x0301,
  SRC_ALPHA: 0x0302,
  ONE_MINUS_SRC_ALPHA: 0x0303,
  DST_ALPHA: 0x0304,
  ONE_MINUS_DST_ALPHA: 0x0305,
  DST_COLOR: 0x0306,
  ONE_MINUS_DST_COLOR: 0x0307,
  SRC_ALPHA_SATURATE: 0x0308,
};

export const getRawWebglBlendingFactor = (key: string): number => {
  const value = FACTORS[key];
  if (value === undefined) {
    console.error("Unknown blending mode:", key);
    return FACTORS.ONE;
  }
  return value;
};
