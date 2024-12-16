export const stepAndWrap = (
  min: number,
  max: number,
  current: number,
  step = 1
) => {
  const newCurrent = current + step;
  if (newCurrent > max) {
    return min;
  }
  if (newCurrent < min) {
    return max;
  }
  return newCurrent;
};
