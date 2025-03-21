"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoStreamNode = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const context_1 = require("../../../context/context");
const getSceneElementByName_1 = require("../../../utils/scene/getSceneElementByName");
const three_1 = require("three");
const VideoStreamNode = ({ src, meshTargetIdentifier, uniformValue, }) => {
    const { state: { initializedScene }, } = (0, context_1.useSceneContext)();
    const canvasRef = (0, react_1.useRef)(null);
    const textureRef = (0, react_1.useRef)(null);
    const setFrameAsUniform = (0, react_1.useCallback)((canvas) => {
        if (initializedScene) {
            const animatedObjects = (0, getSceneElementByName_1.getSceneElementByName)(initializedScene, meshTargetIdentifier);
            if (animatedObjects && animatedObjects.length) {
                const offscreenCanvas = document.createElement("canvas");
                const ctx = offscreenCanvas.getContext("2d");
                if (!ctx)
                    return;
                // Swap width and height for 90-degree rotation
                offscreenCanvas.width = canvas.height;
                offscreenCanvas.height = canvas.width;
                // Apply rotation transformation
                //  ctx.translate(offscreenCanvas.width / 2, offscreenCanvas.height / 2);
                //  ctx.rotate(Math.PI / 2); // 90 degrees
                //  ctx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
                // Dispose of the previous texture
                if (textureRef.current) {
                    textureRef.current.dispose();
                    textureRef.current = null;
                }
                // Create a new texture from the rotated offscreen canvas
                const texture = new three_1.Texture(canvas);
                texture.needsUpdate = true;
                if (animatedObjects[0].material.uniforms[uniformValue]) {
                    animatedObjects[0].material.uniforms[uniformValue].value = texture;
                }
            }
        }
    }, [initializedScene, meshTargetIdentifier]);
    (0, react_1.useEffect)(() => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext("2d");
        if (!ctx)
            return;
        const img = new Image();
        img.crossOrigin = "anonymous"; // Enable cross-origin image loading
        img.src = src;
        img.onload = () => {
            const updateFrame = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                // Set canvas content as a Three.js texture
                setFrameAsUniform(canvas);
                // Schedule the next frame update
                requestAnimationFrame(updateFrame);
            };
            updateFrame();
        };
    }, [src, setFrameAsUniform]);
    // Cleanup when component unmounts
    (0, react_1.useEffect)(() => {
        return () => {
            if (textureRef.current) {
                textureRef.current.dispose();
                textureRef.current = null;
            }
        };
    }, []);
    return (0, jsx_runtime_1.jsx)("canvas", { id: "video-stream", ref: canvasRef, width: 360, height: 640 });
};
exports.VideoStreamNode = VideoStreamNode;
