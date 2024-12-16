export const xyzToArray = (coordinate: {
  x: number;
  y: number;
  z: number;
}): number[] => {
  return [coordinate.x, coordinate.y, coordinate.z];
};
