export const removeDuplicatesByKey = (
  inputArray: Record<string, unknown>[],
  keyProperty: string
): Record<string, unknown>[] => {
  const uniqueObjects = new Map<string, Record<string, unknown>>();
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
