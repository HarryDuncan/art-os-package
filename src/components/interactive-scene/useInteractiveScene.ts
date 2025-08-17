import { useCallback, useEffect } from "react";
import {
  InteractiveScene,
  InteractiveSceneFunctions,
} from "./InteractiveScene";
import { AnimationConfig } from "../../animation/animation.types";
import { Camera, Object3D } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SceneProperties } from "../../config/config.types";
import { setSceneProperties } from "../../utils/scene/setSceneProperties";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useSceneContext } from "../../context/context";
import { PROCESS_STATUS } from "../../consts/consts";
import { SceneLight } from "../../types";

export const useInteractiveScene = (
  sceneFunction: InteractiveSceneFunctions,
  animationConfig: AnimationConfig[],
  meshes: Object3D[] | GLTF[],
  lights: SceneLight[],
  // sceneComponents: Object3D[],
  orbitControls: OrbitControls | null,
  sceneProperties: SceneProperties
) => {
  const {
    dispatch,
    state: { initializedScene, status },
    camera,
    interactionConfigs,
  } = useSceneContext();
  const setUpSceneObjects = useCallback(
    async (scene: InteractiveScene) => {
      console.log(meshes);
      meshes.forEach((mesh) => scene.add(mesh as Object3D));
      lights.forEach((light) => scene.add(light));
      //    sceneComponents.forEach((component) => scene.add(component));
      setSceneProperties(sceneProperties, scene);
      dispatch({
        type: "INITIALIZE_SCENE",
        payload: { initializedScene: scene },
      });
    },
    [meshes, lights, sceneProperties]
  );

  useEffect(() => {
    if (initializedScene && orbitControls) {
      initializedScene.orbitControls = orbitControls;

      dispatch({
        type: "INITIALIZE_SCENE",
        payload: { initializedScene },
      });
    }
  }, [initializedScene, orbitControls, dispatch]);

  useEffect(() => {
    async function setUpScene() {
      const scene = new InteractiveScene(
        sceneFunction,
        animationConfig,
        interactionConfigs,
        sceneProperties,
        lights,
        camera as Camera
      );

      await setUpSceneObjects(scene);
    }
    if (
      initializedScene === null &&
      !!camera &&
      status === PROCESS_STATUS.FORMATTING_THREE
    ) {
      setUpScene();
    }
  }, [
    status,
    sceneFunction,
    animationConfig,
    setUpSceneObjects,
    interactionConfigs,
    initializedScene,
    camera,
  ]);
};
