import { Group } from "three";

export const loadObject = async (url: string): Promise<Group> => {
  const { OBJLoader } = await import("three/examples/jsm/loaders/OBJLoader.js");

  return new Promise((resolve, reject) => {
    const loader = new OBJLoader();
    loader.load(
      url,
      (object) => {
        resolve(object);
      },
      undefined,
      (error) => {
        reject(error);
      }
    );
  });
};
