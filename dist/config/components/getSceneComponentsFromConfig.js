"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSceneComponents = void 0;
const Cube_1 = require("./Cube");
const MarchingCubesElement_1 = require("./marching-cubes/MarchingCubesElement");
const Mirror_1 = require("./Mirror");
const PlaneElement_1 = require("./PlaneElement");
const ShaderBackground_1 = require("./shader-background/ShaderBackground");
const threeJsComponents_types_1 = require("./threeJsComponents.types");
const getSceneComponents = (componentConfigs = []) => componentConfigs.flatMap(({ id, componentType, componentProps }) => {
    switch (componentType) {
        case threeJsComponents_types_1.SCENE_ELEMENTS.MARCHING_CUBES: {
            const { resolution, material, position, isolation, scale } = componentProps;
            return (0, MarchingCubesElement_1.MarchingCubesElement)({
                id,
                resolution,
                material,
                position,
                isolation,
                scale,
            });
        }
        // case SCENE_ELEMENTS.TEXT: {
        //   const {
        //     fontUrl,
        //     text,
        //     material,
        //     position,
        //   } = componentProps as TextProps;
        //   return TextComponent({
        //     id,
        //     text,
        //     fontUrl,
        //     material,
        //     position,
        //   });
        // }
        case threeJsComponents_types_1.SCENE_ELEMENTS.MIRROR: {
            const { geometry, position } = componentProps;
            return (0, Mirror_1.Mirror)({ id, geometry, position });
        }
        case threeJsComponents_types_1.SCENE_ELEMENTS.PLANE: {
            const { material, position, size } = componentProps;
            return (0, PlaneElement_1.PlaneElement)({ id, position, size, material });
        }
        case threeJsComponents_types_1.SCENE_ELEMENTS.CUBE: {
            const { material, position, size } = componentProps;
            return (0, Cube_1.Cube)({ id, position, size, material });
        }
        case threeJsComponents_types_1.SCENE_ELEMENTS.SHADER_BACKGROUND: {
            const { material, position, size } = componentProps;
            return (0, ShaderBackground_1.ShaderBackground)({ material, position, size });
        }
        default:
            console.warn("component not set up for this component type");
            return [];
    }
});
exports.getSceneComponents = getSceneComponents;
