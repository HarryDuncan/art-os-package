export const mergeUnique = <T>(arrs: T[][]): T[] => {
  const seen = new Set();
  const result: T[] = [];
  for (const arr of arrs) {
    for (const item of arr) {
      const key = typeof item === "string" ? item : JSON.stringify(item);
      if (!seen.has(key)) {
        seen.add(key);
        result.push(item);
      }
    }
  }
  return result;
};
