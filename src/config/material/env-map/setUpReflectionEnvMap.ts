import { CubeTextureLoader } from "three";

const getCubeUrls = (path: string, fileFormat: string) => [
  `${path}/left_face.${fileFormat}`,
  `${path}/right_face.${fileFormat}`,
  `${path}/top_face.${fileFormat}`,
  `${path}/bottom_face.${fileFormat}`,
  `${path}/front_face.${fileFormat}`,
  `${path}/back_face.${fileFormat}`,
];

export const setUpReflectionEnvMap = (path: string, fileFormat: string) => {
  const textureLoader = new CubeTextureLoader();
  const urls = getCubeUrls(path, fileFormat);
  const reflectionCube = textureLoader.load(urls);
  return reflectionCube;
};

// export const setUpRefractionEnvMap = (
//   path: string,
//   fileFormat: string,
//   textureLoader: any = new CubeTextureLoader()
// ) => {
//   const urls = getCubeUrls(path, fileFormat);
//   const refractionCube = textureLoader.load(urls);
//   return refractionCube;
// };
