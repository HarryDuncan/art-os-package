const randomValue = () => (Math.random() * 100000).toFixed(0);
export const generateUniquePointName = (
  pointName: string,
  pointParent: string | undefined
) => {
  if (pointParent) {
    return `${pointName}_${pointParent}_${randomValue()}`;
  }
  return `${pointName}_${randomValue()}`;
};
