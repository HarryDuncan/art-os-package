export const mergeArraysWithoutDuplicates = <
  T extends { [key: string]: unknown }
>(
  first: Array<T>,
  second: Array<T>,
  key = "id"
) => {
  const mapById = new Map(first.map((obj) => [obj[key], obj]));
  second.forEach((obj) => {
    if (!mapById.has(obj[key])) {
      mapById.set(obj[key], obj);
    }
  });
  const mergedArray = Array.from(mapById.values());

  return mergedArray;
};
