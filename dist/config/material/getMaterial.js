"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaterial = void 0;
const three_1 = require("three");
const materials_consts_1 = require("./materials.consts");
const setUpEnvMap_1 = require("./env-map/setUpEnvMap");
const getMaterial = (materialType, materialProps) => {
    switch (materialType) {
        case materials_consts_1.MATERIAL_TYPES.MATCAP: {
            const { matcap } = materialProps;
            return new three_1.MeshMatcapMaterial({
                matcap,
                side: three_1.DoubleSide,
            });
        }
        case materials_consts_1.MATERIAL_TYPES.ENV_MAP: {
            const { imageUrl, envMapType } = materialProps;
            const envMap = (0, setUpEnvMap_1.setUpEnvMap)(imageUrl, envMapType);
            return new three_1.MeshStandardMaterial({
                envMap,
                roughness: 0.1,
                metalness: 1.0,
            });
        }
        case materials_consts_1.MATERIAL_TYPES.VIDEO: {
            const { videoId } = materialProps;
            const video = document.getElementById(videoId);
            if (video) {
                const texture = new three_1.VideoTexture(video);
                const parameters = { color: 0xffffff, map: texture };
                return new three_1.MeshBasicMaterial(parameters);
            }
            console.warn("no video element found");
            return new three_1.MeshStandardMaterial({});
        }
        case materials_consts_1.MATERIAL_TYPES.PHONG: {
            const { color, specular, shininess } = materialProps;
            return new three_1.MeshPhongMaterial({ color, specular, shininess });
        }
        case materials_consts_1.MATERIAL_TYPES.STANDARD: {
            const { color, roughness, metalness, envMapIntensity } = materialProps;
            return new three_1.MeshStandardMaterial({
                color,
                roughness,
                metalness,
                envMapIntensity,
            });
        }
        default:
            return new three_1.MeshStandardMaterial({});
    }
};
exports.getMaterial = getMaterial;
