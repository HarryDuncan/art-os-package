import { DoubleSide, MeshBasicMaterial, MeshMatcapMaterial, MeshPhongMaterial, MeshStandardMaterial, VideoTexture, } from "three";
import { MATERIAL_TYPES } from "./materials.consts";
import { setUpEnvMap } from "./env-map/setUpEnvMap";
export const getMaterial = (materialType, materialProps) => {
    switch (materialType) {
        case MATERIAL_TYPES.MATCAP: {
            const { matcap } = materialProps;
            return new MeshMatcapMaterial({
                matcap,
                side: DoubleSide,
            });
        }
        case MATERIAL_TYPES.ENV_MAP: {
            const { imageUrl, envMapType } = materialProps;
            const envMap = setUpEnvMap(imageUrl, envMapType);
            return new MeshStandardMaterial({
                envMap,
                roughness: 0.1,
                metalness: 1.0,
            });
        }
        case MATERIAL_TYPES.VIDEO: {
            const { videoId } = materialProps;
            const video = document.getElementById(videoId);
            if (video) {
                const texture = new VideoTexture(video);
                const parameters = { color: 0xffffff, map: texture };
                return new MeshBasicMaterial(parameters);
            }
            console.warn("no video element found");
            return new MeshStandardMaterial({});
        }
        case MATERIAL_TYPES.PHONG: {
            const { color, specular, shininess } = materialProps;
            return new MeshPhongMaterial({ color, specular, shininess });
        }
        case MATERIAL_TYPES.STANDARD: {
            const { color, roughness, metalness, envMapIntensity } = materialProps;
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
