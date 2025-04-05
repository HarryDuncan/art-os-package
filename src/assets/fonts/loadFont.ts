import { Font } from "three/examples/jsm/loaders/FontLoader.js";

export const loadFont = async (fontUrl: string): Promise<Font> => {
  const { FontLoader } = await import(
    "three/examples/jsm/loaders/FontLoader.js"
  );

  return new Promise((resolve, reject) => {
    const loader = new FontLoader();
    loader.load(
      fontUrl,
      (font) => {
        resolve(font);
      },
      undefined,
      (error) => {
        reject(error);
      }
    );
  });
};
