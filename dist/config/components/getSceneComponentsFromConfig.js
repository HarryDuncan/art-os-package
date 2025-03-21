import { Cube } from "./Cube";
import { MarchingCubesElement } from "./marching-cubes/MarchingCubesElement";
import { Mirror } from "./Mirror";
import { PlaneElement } from "./PlaneElement";
import { ShaderBackground } from "./shader-background/ShaderBackground";
import { SCENE_ELEMENTS, } from "./threeJsComponents.types";
export const getSceneComponents = (componentConfigs = []) => componentConfigs.flatMap(({ id, componentType, componentProps }) => {
    switch (componentType) {
        case SCENE_ELEMENTS.MARCHING_CUBES: {
            const { resolution, material, position, isolation, scale } = componentProps;
            return MarchingCubesElement({
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
        case SCENE_ELEMENTS.MIRROR: {
            const { geometry, position } = componentProps;
            return Mirror({ id, geometry, position });
        }
        case SCENE_ELEMENTS.PLANE: {
            const { material, position, size } = componentProps;
            return PlaneElement({ id, position, size, material });
        }
        case SCENE_ELEMENTS.CUBE: {
            const { material, position, size } = componentProps;
            return Cube({ id, position, size, material });
        }
        case SCENE_ELEMENTS.SHADER_BACKGROUND: {
            const { material, position, size } = componentProps;
            return ShaderBackground({ material, position, size });
        }
        default:
            console.warn("component not set up for this component type");
            return [];
    }
});
