import {
  DoubleSide,
  Material,
  MeshBasicMaterial,
  MeshMatcapMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
  VideoTexture,
} from "three";
import { MATERIAL_TYPES } from "./materials.consts";
import {
  EnvMapMaterialProps,
  MatcapMaterialProps,
  MaterialConfigProps,
  MaterialType,
  PhongMaterialProps,
  StandardMaterialProps,
  VideoMaterialProps,
} from "./materials.types";
import { setUpEnvMap } from "./env-map/setUpEnvMap";

export const getMaterial = (
  materialType: MaterialType,
  materialProps: MaterialConfigProps
): Material => {
  switch (materialType) {
    case MATERIAL_TYPES.MATCAP: {
      const { matcap } = materialProps as MatcapMaterialProps;
      return new MeshMatcapMaterial({
        matcap,
        side: DoubleSide,
      });
    }
    case MATERIAL_TYPES.ENV_MAP: {
      const { imageUrl, envMapType } = materialProps as EnvMapMaterialProps;
      const envMap = setUpEnvMap(imageUrl, envMapType);
      return new MeshStandardMaterial({
        envMap,
        roughness: 0.1,
        metalness: 1.0,
      });
    }
    case MATERIAL_TYPES.VIDEO: {
      const { videoId } = materialProps as VideoMaterialProps;
      const video = document.getElementById(videoId);
      if (video) {
        const texture = new VideoTexture(video as HTMLVideoElement);
        const parameters = { color: 0xffffff, map: texture };
        return new MeshBasicMaterial(parameters);
      }
      console.warn("no video element found");
      return new MeshStandardMaterial({});
    }
    case MATERIAL_TYPES.PHONG: {
      const { color, specular, shininess } =
        materialProps as unknown as PhongMaterialProps;
      return new MeshPhongMaterial({ color, specular, shininess });
    }
    case MATERIAL_TYPES.STANDARD: {
      const { color, roughness, metalness, envMapIntensity } =
        materialProps as unknown as StandardMaterialProps;
      return new MeshStandardMaterial({
        color,
        roughness,
        metalness,
        envMapIntensity,
      });
    }

    default:
      return new MeshStandardMaterial({});
  }
};
