export const getOpacity = (hasOpacity?: boolean | undefined) => {
  if (hasOpacity) {
    return `matcapColor.a * opacity`;
  }
  return `matcapColor.a`;
};
