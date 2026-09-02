export type ViewDimensionUnit = "px" | "%" | "vw" | "vh";

export type ParsedViewDimension = {
  numericValue: number;
  unit: ViewDimensionUnit;
};

export type ParsedViewSize = {
  value: number;
  unit: "px" | "%";
};

const VIEW_DIMENSION_PATTERN = /^([\d.]+)(px|%|vw|vh)$/i;

export const parseViewDimension = (
  value: string | undefined,
): ParsedViewDimension | null => {
  if (!value?.trim()) {
    return null;
  }

  const match = value.trim().match(VIEW_DIMENSION_PATTERN);
  if (!match) {
    return null;
  }

  return {
    numericValue: parseFloat(match[1]),
    unit: match[2].toLowerCase() as ViewDimensionUnit,
  };
};

export const parseViewSize = (
  value: string | undefined,
): ParsedViewSize | undefined => {
  const parsed = parseViewDimension(value);
  if (!parsed) {
    return undefined;
  }

  if (parsed.unit === "px") {
    return { value: parsed.numericValue, unit: "px" };
  }

  return { value: parsed.numericValue, unit: "%" };
};
