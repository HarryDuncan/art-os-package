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
exports.setUpAdvancedMeshes = void 0;
const three_1 = require("three");
const formatFromConfig_1 = require("../../../utils/three-dimension-space/formatFromConfig");
const getMeshesFromConfig_1 = require("../getMeshesFromConfig");
const setUpAdvancedMeshes = (config, meshes) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const { clone } = yield Promise.resolve().then(() => __importStar(require("three/examples/jsm/utils/SkeletonUtils.js")));
    const result = new three_1.Group();
    // @ts-ignore
    const meshConfigs = config.meshConfigs;
    // @ts-ignore
    const meshResults = yield (0, getMeshesFromConfig_1.getMeshesFromConfig)(meshConfigs);
    // @ts-ignore
    meshResults.forEach((mesh) => {
        // @ts-ignore
        const clonedMesh = clone(mesh);
        // @ts-ignore
        result.add(clonedMesh);
    });
    return result;
});
exports.setUpAdvancedMeshes = setUpAdvancedMeshes;
const loopThroughAllChildren = (data, materials, meshTransforms, attributeConfigs, meshComponentConfigs) => {
    const { children } = data;
    children.forEach((child) => {
        const { idGroup, isMesh } = child;
        if (idGroup || child.children.length > 0) {
            loopThroughAllChildren(child, materials, meshTransforms, attributeConfigs, meshComponentConfigs);
        }
        if (isMesh) {
            // // add any material data to mesh
            // const formattedTransforms = formatMeshAttributes(
            //   meshTransforms ?? [],
            //   attributeConfigs as unknown as ShaderAttributeConfig[]
            // );
            // const shaderMaterial = materials[0];
            // child.material = shaderMaterial;
            // // return group
        }
    });
};
const formatScene = (scene, meshConfig) => {
    var _a;
    // @ts-ignore
    const clonedScene = clone(scene);
    const position = (0, formatFromConfig_1.formatPositionFromConfig)(meshConfig);
    const rotation = (0, formatFromConfig_1.formatRotationFromConfig)(meshConfig);
    clonedScene.position.set(position.x, position.y, position.z);
    clonedScene.rotation.set(rotation.x, rotation.y, rotation.z);
    const scale = ((_a = meshConfig.geometryConfig) === null || _a === void 0 ? void 0 : _a.scale) || 1;
    clonedScene.scale.set(scale, scale, scale);
    return clonedScene;
};
