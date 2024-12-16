export const generateUniqueFragName = (
  fragName: string,
  fragParent: string | undefined
) => {
  if (fragParent) {
    return `${fragName}_${fragParent}`;
  }
  return fragName;
};
