import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RootContainer } from "../root/root-container";
import { useInteractiveScene } from "../../components/interactive-scene/useInteractiveScene";
import { useThreadWithPostProcessor } from "../../hooks/use-thread";
import { useThreeJs } from "../../hooks/use-three-js/useThreeJs";
import { useSetWindowState } from "../../compat/window-state/useSetWindowState";
import { useSceneFunctions } from "../../hooks/useSceneFunctions";
import { SceneProvider } from "../../context/context";
import { AppendedNodes } from "../appended-nodes/AppendedNodes";
const SceneNode = (props) => (_jsxs(SceneProvider, { children: [_jsx(SceneNodeContent, Object.assign({}, props)), props.appendedNodes && (_jsx(AppendedNodes, { appendedNodes: props.appendedNodes }))] }));
const SceneNodeContent = ({ sceneFunctions, interactionEvents = [], events, sceneData: { threeJsParams, animationConfig, lights, meshes, sceneComponents, sceneProperties, }, }) => {
    useSetWindowState();
    const { container, renderer, camera, currentFrameRef, orbitControls } = useThreeJs(threeJsParams);
    const formattedSceneFunctions = useSceneFunctions(sceneFunctions);
    useInteractiveScene(formattedSceneFunctions, events, animationConfig, meshes, lights, sceneComponents, orbitControls, sceneProperties, interactionEvents);
    useThreadWithPostProcessor(currentFrameRef, camera, renderer, []);
    return (_jsx(RootContainer, { containerRef: container, sceneProperties: sceneProperties }));
};
export default SceneNode;
