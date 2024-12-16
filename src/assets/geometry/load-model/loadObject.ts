import { Group } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export const loadObject = async (path: string) =>
  new Promise((resolve: (value: Group) => void) => {
    const objectLoader = new OBJLoader();
    objectLoader.load(
      path,
      (object: Group) => {
        const result = object;
        resolve(result);
      },
      // On Progress
      () => null,
      // On Error
      () => {
        console.error("error loading object");
      }
    );
  });
