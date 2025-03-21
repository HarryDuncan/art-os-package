import { useCallback, useEffect } from "react";
import {
  InteractiveScene,
  InteractiveSceneFunctions,
  SceneInteraction,
} from "./InteractiveScene";
import { EventConfig } from "../../interaction/interaction.types";
import { AnimationConfig } from "../../animation/animation.types";
import { Object3D } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SceneProperties } from "../../config/config.types";
import { setSceneProperties } from "../../utils/scene/setSceneProperties";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { SceneLight } from "../../config/lights/lights.types";
import { useSceneContext } from "../../context/context";

export const useInteractiveScene = (
  sceneFunction: InteractiveSceneFunctions,
  eventConfig: EventConfig[],
  animationConfig: AnimationConfig[],
  meshes: Object3D[] | GLTF[],
  lights: SceneLight[],
  sceneComponents: Object3D[],
  orbitControls: OrbitControls | null,
  sceneProperties: SceneProperties,
  interactionEvents: SceneInteraction[]
) => {
  const {
    dispatch,
    state: { initializedScene },
  } = useSceneContext();

  const setUpSceneObjects = useCallback(
    async (scene: InteractiveScene) => {
      // @ts-ignore
      meshes.forEach((mesh) => scene.add(mesh as Object3D));
      // @ts-ignore
      lights.forEach((light) => scene.add(light));
      // @ts-ignore
      sceneComponents.forEach((component) => scene.add(component));
      scene.addOrbitControls(orbitControls);
      setSceneProperties(sceneProperties, scene);
      dispatch({
        type: "INITIALIZE_SCENE",
        payload: { initializedScene: scene },
      });
    },
    [meshes, lights, sceneComponents, orbitControls, sceneProperties]
  );

  useEffect(() => {
    async function setUpScene() {
      const scene = new InteractiveScene(
        sceneFunction,
        eventConfig,
        animationConfig,
        interactionEvents
      );

      await setUpSceneObjects(scene);
    }
    if (initializedScene === null) {
      setUpScene();
    }
  }, [
    sceneFunction,
    eventConfig,
    animationConfig,
    setUpSceneObjects,
    interactionEvents,
    initializedScene,
  ]);
};
