import { useCallback, useEffect, useState } from "react";
import {
  InteractiveScene,
  InteractiveSceneFunctions,
  SceneInteraction,
} from "./InteractiveScene";
import { EventConfig } from "../../interaction/interactions.types";
import { AnimationConfig } from "../../animation/animation.types";
import { Object3D } from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SceneProperties } from "../../config/config.types";
import { setSceneProperties } from "../../utils/scene/setSceneProperties";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { SceneLight } from "../../config/lights/lights.types";

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
): null | InteractiveScene => {
  const [initializedScene, setScene] = useState<null | InteractiveScene>(null);

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
      setScene(scene);
    },
    [setScene, meshes, lights, sceneComponents, orbitControls, sceneProperties]
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

  return initializedScene;
};
