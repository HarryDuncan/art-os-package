"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.useOrbitControls = void 0;
const react_1 = require("react");
const three_1 = require("three");
const useOrbitControls = (camera, renderer, config) => {
    return (0, react_1.useMemo)(() => __awaiter(void 0, void 0, void 0, function* () {
        const { OrbitControls } = yield Promise.resolve().then(() => __importStar(require("three/examples/jsm/controls/OrbitControls.js")));
        const { CSS3DRenderer } = yield Promise.resolve().then(() => __importStar(require("three/examples/jsm/renderers/CSS3DRenderer.js")));
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 1;
        controls.maxDistance = 500;
        controls.maxPolarAngle = Math.PI;
        controls.mouseButtons = {
            LEFT: three_1.MOUSE.ROTATE,
            MIDDLE: three_1.MOUSE.DOLLY,
            RIGHT: three_1.MOUSE.PAN,
        };
        if (config) {
            controls.enabled = config.enabled;
            controls.enableZoom = config.enableZoom;
            controls.enablePan = config.enablePan;
            controls.enableRotate = config.enableRotate;
            controls.autoRotate = config.autoRotate;
            controls.autoRotateSpeed = config.autoRotateSpeed;
            controls.target.set(config.target.x, config.target.y, config.target.z);
        }
        return controls;
    }), [camera, renderer, config]);
};
exports.useOrbitControls = useOrbitControls;
