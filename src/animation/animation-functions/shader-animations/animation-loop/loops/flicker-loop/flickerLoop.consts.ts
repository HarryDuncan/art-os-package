export const FLICKER_LOOP_TYPES = {
  FIXED: "FIXED",
  UNDULATING: "UNDULATING",
};

export const DEFAULT_FLICKER_LOOP_PROPS = {
  peak: 1,
  trough: 0,
  duration: 200,
  flickerTimeAtMax: 0.5,
  flickerType: FLICKER_LOOP_TYPES.UNDULATING,
};
