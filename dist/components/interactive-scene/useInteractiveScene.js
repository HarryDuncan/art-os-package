"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInteractiveScene = void 0;
const react_1 = require("react");
const InteractiveScene_1 = require("./InteractiveScene");
const setSceneProperties_1 = require("../../utils/scene/setSceneProperties");
const context_1 = require("../../context/context");
const useInteractiveScene = (sceneFunction, eventConfig, animationConfig, meshes, lights, sceneComponents, orbitControls, sceneProperties, interactionEvents) => {
    const { dispatch, state: { initializedScene }, } = (0, context_1.useSceneContext)();
    const setUpSceneObjects = (0, react_1.useCallback)((scene) => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        meshes.forEach((mesh) => scene.add(mesh));
        // @ts-ignore
        lights.forEach((light) => scene.add(light));
        // @ts-ignore
        sceneComponents.forEach((component) => scene.add(component));
        scene.addOrbitControls(orbitControls);
        (0, setSceneProperties_1.setSceneProperties)(sceneProperties, scene);
        dispatch({
            type: "INITIALIZE_SCENE",
            payload: { initializedScene: scene },
        });
    }), [meshes, lights, sceneComponents, orbitControls, sceneProperties]);
    (0, react_1.useEffect)(() => {
        function setUpScene() {
            return __awaiter(this, void 0, void 0, function* () {
                const scene = new InteractiveScene_1.InteractiveScene(sceneFunction, eventConfig, animationConfig, interactionEvents);
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
exports.useInteractiveScene = useInteractiveScene;
