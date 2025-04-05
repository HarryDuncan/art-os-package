import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";

export const loadFont = async (fontUrl: string): Promise<Font> => {
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
