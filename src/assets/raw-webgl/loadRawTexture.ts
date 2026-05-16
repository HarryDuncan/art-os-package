export const loadRawTexture = async (path: string): Promise<ImageBitmap> => {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(
      `failed to fetch texture "${path}": ${response.status} ${response.statusText}`,
    );
  }
  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob, {
    imageOrientation: "flipY",
    premultiplyAlpha: "none",
  });
  if (!isPowerOfTwo(bitmap.width) || !isPowerOfTwo(bitmap.height)) {
    console.warn(`"${path}" image size is not power of 2.`);
  }
  return bitmap;
};

const isPowerOfTwo = (value: number) =>
  (value & (value - 1)) === 0 && value > 0;
