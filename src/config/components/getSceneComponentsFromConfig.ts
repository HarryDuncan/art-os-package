import {
  Mirror,
  MarchingCubesElement,
} from "display/scene-elements/components";
import { Cube } from "display/scene-elements/components/Cube";
import {
  SCENE_ELEMENTS,
  MarchingCubesProps,
  MirrorProps,
  PlaneProps,
  CubeProps,
  ShaderBackgroundProps,
} from "display/scene-elements/components/threeJsComponents.types";
import { PlaneElement } from "display/scene-elements/components/PlaneElement";
import { SceneComponentConfig } from "../config.types";
import { ShaderBackground } from "display/scene-elements/components/shader-background/ShaderBackground";

export const getSceneComponents = (
  componentConfigs: SceneComponentConfig[] = []
) =>
  componentConfigs.flatMap(({ id, componentType, componentProps }) => {
    switch (componentType) {
      case SCENE_ELEMENTS.MARCHING_CUBES: {
        const { resolution, material, position, isolation, scale } =
          componentProps as MarchingCubesProps;
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
        const { geometry, position } = componentProps as MirrorProps;
        return Mirror({ id, geometry, position });
      }
      case SCENE_ELEMENTS.PLANE: {
        const { material, position, size } = componentProps as PlaneProps;
        return PlaneElement({ id, position, size, material });
      }
      case SCENE_ELEMENTS.CUBE: {
        const { material, position, size } = componentProps as CubeProps;
        return Cube({ id, position, size, material });
      }
      case SCENE_ELEMENTS.SHADER_BACKGROUND: {
        const { material, position, size } =
          componentProps as ShaderBackgroundProps;
        return ShaderBackground({ material, position, size });
      }

      default:
        console.warn("component not set up for this component type");
        return [];
    }
  });
