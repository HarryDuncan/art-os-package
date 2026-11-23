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
  return bitmap;
};
