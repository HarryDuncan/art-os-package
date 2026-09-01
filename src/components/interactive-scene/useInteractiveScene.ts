import { useCallback, useEffect } from "react";
import {
  InteractiveScene,
  InteractiveSceneFunctions,
} from "./InteractiveScene";
import { Camera, Object3D } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FormattedSceneProperties } from "../../config/config.types";
import { setSceneProperties } from "../../utils/scene/setSceneProperties";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useSceneContext } from "../../context/context";
import { PROCESS_STATUS } from "../../consts/consts";
import { refreshLightUniformInteraction } from "../../parameter-control/lightUniformInteraction";
// import { SceneLight } from "../../types";

export const useInteractiveScene = (
  sceneFunction: InteractiveSceneFunctions,
  meshes: Object3D[] | GLTF[],
  orbitControls: OrbitControls | null,
  sceneProperties: FormattedSceneProperties,
) => {
  const { initializedScene, camera, peripheralConfigs, sceneStatus } =
    useSceneContext();

  const setUpSceneObjects = useCallback(
    async (scene: InteractiveScene) => {
      meshes.forEach((mesh) => scene.add(mesh as Object3D));
      setSceneProperties(sceneProperties, scene);
      initializedScene.current = scene;
    },
    [meshes, sceneProperties],
  );

  useEffect(() => {
    if (initializedScene.current && orbitControls) {
      initializedScene.current.orbitControls = orbitControls;
      refreshLightUniformInteraction();
    }
  }, [initializedScene, orbitControls]);

  useEffect(() => {
    async function setUpScene() {
      const scene = new InteractiveScene(
        sceneFunction,
        peripheralConfigs,
        sceneProperties,
        camera.current as Camera,
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
    setUpSceneObjects,
    peripheralConfigs,
    initializedScene,
    camera,
  ]);
};
