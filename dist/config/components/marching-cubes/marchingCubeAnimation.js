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
exports.createMarchingCubeAnimation = exports.updateCubes = exports.animateMarchingCube = void 0;
const getMeshesByIdentifier_1 = require("../../../utils/scene/object-finding/getMeshesByIdentifier");
const animateMarchingCube = (scene) => {
    const time = scene.clock.getElapsedTime() * 0.08;
    const marchingCube = (0, getMeshesByIdentifier_1.getMeshesByIdentifier)(scene, "marching-cubes");
    if (!marchingCube.length) {
        return;
    }
    const cube = marchingCube[0];
    // @ts-ignore
    (0, exports.updateCubes)(cube, time, 15);
};
exports.animateMarchingCube = animateMarchingCube;
const updateCubes = (object, time, numblobs) => {
    object.reset();
    // fill the field with some metaballs
    const subtract = 12;
    const strength = 1.2 / ((Math.sqrt(numblobs) - 1) / 4 + 1);
    for (let i = 0; i < numblobs; i += 1) {
        const ballx = Math.sin(i + 1.26 * time * (1.03 + 0.5 * Math.cos(0.21 * i))) * 0.27 +
            0.5;
        const bally = Math.abs(Math.tan(i + 1.12 * time * Math.cos(1.22 + 0.1424 * i))) * 0.77; // dip into the floor
        const ballz = Math.cos(i + 1.32 * time * 0.1 * Math.sin(0.92 + 0.53 * i)) * 0.27;
        object.addBall(ballx, bally, ballz, strength, subtract);
    }
    // @ts-ignore
    object.update();
};
exports.updateCubes = updateCubes;
const createMarchingCubeAnimation = (resolution, isolation) => __awaiter(void 0, void 0, void 0, function* () {
    const { MarchingCubes } = yield Promise.resolve().then(() => __importStar(require("three/examples/jsm/objects/MarchingCubes.js")));
    const marchingCubes = new MarchingCubes(resolution, isolation);
    return marchingCubes;
});
exports.createMarchingCubeAnimation = createMarchingCubeAnimation;
