export const removeDuplicatesByKey = <T extends Record<string, unknown>>(
  inputArray: T[],
  keyProperty: string
): T[] => {
  console.log("inputArray", inputArray);
  const uniqueObjects = new Map<string, T>();
  inputArray.forEach((obj) => {
    if (obj[keyProperty]) {
      const keyValue = obj[keyProperty] as string;
      if (!uniqueObjects.has(keyValue)) {
        uniqueObjects.set(keyValue, obj);
      }
    }
  });

  return Array.from(uniqueObjects.values());
};
