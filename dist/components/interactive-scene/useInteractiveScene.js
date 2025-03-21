var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useCallback, useEffect } from "react";
import { InteractiveScene, } from "./InteractiveScene";
import { setSceneProperties } from "../../utils/scene/setSceneProperties";
import { useSceneContext } from "../../context/context";
export const useInteractiveScene = (sceneFunction, eventConfig, animationConfig, meshes, lights, sceneComponents, orbitControls, sceneProperties, interactionEvents) => {
    const { dispatch, state: { initializedScene }, } = useSceneContext();
    const setUpSceneObjects = useCallback((scene) => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        meshes.forEach((mesh) => scene.add(mesh));
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
    }), [meshes, lights, sceneComponents, orbitControls, sceneProperties]);
    useEffect(() => {
        function setUpScene() {
            return __awaiter(this, void 0, void 0, function* () {
                const scene = new InteractiveScene(sceneFunction, eventConfig, animationConfig, interactionEvents);
                yield setUpSceneObjects(scene);
            });
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
