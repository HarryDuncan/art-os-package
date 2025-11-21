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
  const { initializedScene, camera, interactionConfigs, sceneStatus } =
    useSceneContext();

  const setUpSceneObjects = useCallback(
    async (scene: InteractiveScene) => {
      meshes.forEach((mesh) => scene.add(mesh as Object3D));
      lights.forEach((light) => scene.add(light));
      //    sceneComponents.forEach((component) => scene.add(component));
      setSceneProperties(sceneProperties, scene);
      initializedScene.current = scene;
    },
    [meshes, lights, sceneProperties]
  );

  useEffect(() => {
    if (initializedScene.current && orbitControls) {
      initializedScene.current.orbitControls = orbitControls;
    }
  }, [initializedScene, orbitControls]);

  useEffect(() => {
    async function setUpScene() {
      const scene = new InteractiveScene(
        sceneFunction,
        animationConfig,
        interactionConfigs,
        sceneProperties,
        lights,
        camera.current as Camera
      );

      await setUpSceneObjects(scene);
    }
    if (
      initializedScene.current === null &&
      !!camera.current &&
      sceneStatus === PROCESS_STATUS.FORMATTING_THREE
    ) {
      setUpScene();
    }
  }, [
    sceneStatus,
    sceneFunction,
    animationConfig,
    setUpSceneObjects,
    interactionConfigs,
    initializedScene,
    camera,
  ]);
};
