export const getUniformsForOutput = (
  outputForMaterials: Record<string, any>,
) => {
  return Object.entries(outputForMaterials).reduce(
    (acc, [key, output]) => {
      acc[key] = Object.entries(output).map(([key, value]) => {
        return `u_${key}_${(value as { itemId: string }).itemId}`;
      });
      return acc;
    },
    {} as Record<string, string[]>,
  );
};
