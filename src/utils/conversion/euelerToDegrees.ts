export const eulerToDegrees = (value: number): number => {
  const degree = value * (180 / Math.PI);
  return degree;
};
