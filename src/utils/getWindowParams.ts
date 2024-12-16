export const getWindowParams = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const pixelRatio = window.devicePixelRatio;

  return { width, height, pixelRatio };
};
