export const BACKGROUND_TYPES = {
  COLOR: "color",
} as const;

export type BackgroundType =
  (typeof BACKGROUND_TYPES)[keyof typeof BACKGROUND_TYPES];

export const BACKGROUND_TYPE_OPTIONS = [
  { value: BACKGROUND_TYPES.COLOR, label: "Color" },
];
