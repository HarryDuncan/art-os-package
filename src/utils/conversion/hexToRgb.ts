export const hexToRgb = (hexCode: string): number[] | null => {
  // Remove the '#' if present
  const hex = String(hexCode).replace(/^#/, "");

  // Validate hex code
  const hexRegex = /^[0-9A-Fa-f]{6}$/;
  if (!hexRegex.test(hex)) {
    console.error("Invalid hex color code");
    return null;
  }

  // Extract RGB components
  const r = parseInt(hex.substr(0, 2), 16) / 255.0;
  const g = parseInt(hex.substr(2, 2), 16) / 255.0;
  const b = parseInt(hex.substr(4, 2), 16) / 255.0;

  // Return the normalized RGB vector
  return [r, g, b];
};
