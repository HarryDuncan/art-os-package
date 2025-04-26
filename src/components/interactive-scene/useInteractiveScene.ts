import { useCallback, useEffect } from "react";
import {
  InteractiveScene,
  InteractiveSceneFunctions,
} from "./InteractiveScene";
import {
  EventConfig,
  InteractionConfig,
} from "../../interaction/interaction.types";
import { AnimationConfig } from "../../types/animation.types";
import { Camera, Object3D } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SceneProperties } from "../../types/config.types";
import { setSceneProperties } from "../../utils/scene/setSceneProperties";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useSceneContext } from "../../context/context";
import { PROCESS_STATUS } from "../../consts/consts";
import { SceneLight } from "../../types";

export const useInteractiveScene = (
  camera: Camera,
  sceneFunction: InteractiveSceneFunctions,
  eventConfig: EventConfig[],
  animationConfig: AnimationConfig[],
  meshes: Object3D[] | GLTF[],
  lights: SceneLight[],
  sceneComponents: Object3D[],
  orbitControls: OrbitControls | null,
  sceneProperties: SceneProperties,
  interactionConfig: InteractionConfig[]
) => {
  const {
    dispatch,
    state: { initializedScene, status },
  } = useSceneContext();
  const setUpSceneObjects = useCallback(
    async (scene: InteractiveScene) => {
      meshes.forEach((mesh) => scene.add(mesh as Object3D));
      lights.forEach((light) => scene.add(light));
      sceneComponents.forEach((component) => scene.add(component));
      setSceneProperties(sceneProperties, scene);
      dispatch({
        type: "INITIALIZE_SCENE",
        payload: { initializedScene: scene },
      });
    },
    [meshes, lights, sceneComponents, sceneProperties]
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
        eventConfig,
        animationConfig,
        interactionConfig,
        sceneProperties,
        lights,
        camera
      );

      await setUpSceneObjects(scene);
    }
    if (
      initializedScene === null &&
      status === PROCESS_STATUS.FORMATTING_THREE
    ) {
      setUpScene();
    }
  }, [
    status,
    sceneFunction,
    eventConfig,
    animationConfig,
    setUpSceneObjects,
    interactionConfig,
    initializedScene,
    camera,
  ]);
};
