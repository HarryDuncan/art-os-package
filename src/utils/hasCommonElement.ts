export const hasCommonValues = (array1: unknown[], array2: unknown[]) =>
  array1.some((value) => array2.includes(value));
