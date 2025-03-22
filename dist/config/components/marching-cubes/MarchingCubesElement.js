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
exports.MarchingCubesElement = exports.createMarchingCubes = void 0;
const marchingCubes_constants_1 = require("./marchingCubes.constants");
const materials_default_1 = require("../../../config/material/materials.default");
const createMarchingCubes = (resolution, isolation) => __awaiter(void 0, void 0, void 0, function* () {
    const { MarchingCubes } = yield Promise.resolve().then(() => __importStar(require("three/examples/jsm/objects/MarchingCubes.js")));
    const marchingCubes = new MarchingCubes(resolution, isolation);
    return marchingCubes;
});
exports.createMarchingCubes = createMarchingCubes;
const MarchingCubesElement = ({ id, resolution = marchingCubes_constants_1.DEFAULT_RESOLUTION, material = materials_default_1.DEFAULT_MATERIAL, isolation = marchingCubes_constants_1.DEFAULT_ISOLATION, scale = marchingCubes_constants_1.DEFAULT_MARCHING_CUBES_SCALE, }) => {
    return (0, exports.createMarchingCubes)(resolution, isolation).then((marchingCubeEffect) => {
        marchingCubeEffect.position.set(0, 0, 0);
        marchingCubeEffect.scale.set(scale, scale, scale);
        marchingCubeEffect.isolation = isolation;
        marchingCubeEffect.enableUvs = false;
        marchingCubeEffect.enableColors = false;
        marchingCubeEffect.name = `marching-cubes-${id}`;
        return marchingCubeEffect;
    });
};
exports.MarchingCubesElement = MarchingCubesElement;
