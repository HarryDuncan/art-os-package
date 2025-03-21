import { CubeTextureLoader } from "three";
const getCubeUrls = (path, fileFormat) => [
    `${path}/left_face.${fileFormat}`,
    `${path}/right_face.${fileFormat}`,
    `${path}/top_face.${fileFormat}`,
    `${path}/bottom_face.${fileFormat}`,
    `${path}/front_face.${fileFormat}`,
    `${path}/back_face.${fileFormat}`,
];
export const setUpReflectionEnvMap = (path, fileFormat) => {
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
