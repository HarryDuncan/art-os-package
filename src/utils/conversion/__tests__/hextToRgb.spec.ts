import { assert, test } from "vitest";
import { hexToRgb } from "../hexToRGB";

test("hexToRgb should convert hex to normalized RGB", () => {
  const hexColor = "#1A2B3C";
  const expectedNormalizedRgb = [
    0.10196078431372549,
    0.16862745098039217,
    0.23529411764705882,
  ];

  const normalizedRgb = hexToRgb(hexColor);

  assert.deepStrictEqual(normalizedRgb, expectedNormalizedRgb);
});

test("hexToRgb should handle lowercase hex codes", () => {
  const hexColor = "#aabbcc";
  const expectedNormalizedRgb = [0.6666666666666666, 0.7333333333333333, 0.8];

  const normalizedRgb = hexToRgb(hexColor);

  assert.deepStrictEqual(normalizedRgb, expectedNormalizedRgb);
});

test("hexToRgb should handle invalid hex codes and return null", () => {
  const invalidHexColor = "#invalid";

  const normalizedRgb = hexToRgb(invalidHexColor);

  assert.strictEqual(normalizedRgb, null);
});
