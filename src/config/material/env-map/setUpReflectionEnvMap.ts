import { CubeTextureLoader } from "three";

const getCubeUrls = (url: string, fileFormat: string) => [
  `${url}/left_face.${fileFormat}`,
  `${url}/right_face.${fileFormat}`,
  `${url}/top_face.${fileFormat}`,
  `${url}/bottom_face.${fileFormat}`,
  `${url}/front_face.${fileFormat}`,
  `${url}/back_face.${fileFormat}`,
];

export const setUpReflectionEnvMap = (url: string, fileFormat: string) => {
  const textureLoader = new CubeTextureLoader();
  const urls = getCubeUrls(url, fileFormat);
  const reflectionCube = textureLoader.load(urls);
  return reflectionCube;
};

// export const setUpRefractionEnvMap = (
//   url: string,
//   fileFormat: string,
//   textureLoader: any = new CubeTextureLoader()
// ) => {
//   const urls = getCubeUrls(url, fileFormat);
//   const refractionCube = textureLoader.load(urls);
//   return refractionCube;
// };
