import {
  TextureLoader,
  MathUtils as Math,
  Texture,
  LinearFilter,
  RGBAFormat,
} from "three";

export const loadTexture = (path: string) =>
  new Promise((resolve: (value: Texture) => void) => {
    const textureLoader = new TextureLoader();
    textureLoader.load(path, (data) => {
      if (
        !Math.isPowerOfTwo(data.image.width) ||
        !Math.isPowerOfTwo(data.image.height)
      ) {
        console.warn(`"${path}" image size is not power of 2.`);
      }
      data.minFilter = LinearFilter;
      data.magFilter = LinearFilter;
      data.format = RGBAFormat;

      data.needsUpdate = true;
      resolve(data);
    });
  });
