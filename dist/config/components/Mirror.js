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
exports.createMirror = exports.Mirror = void 0;
const three_1 = require("three");
const rotatePlane_1 = require("../../utils/three-dimension-space/rotatePlane");
const Mirror = ({ id, geometry, position, }) => __awaiter(void 0, void 0, void 0, function* () {
    const { Reflector } = yield Promise.resolve().then(() => __importStar(require("three/examples/jsm/objects/Reflector.js")));
    const mirror = new Reflector(geometry, {
        clipBias: 0.003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        color: new three_1.Color(0x19191a),
    });
    mirror.name = id;
    mirror.position.set(position.x, position.y, position.z);
    const targetCoordinate = new three_1.Vector3(0, 0, 0);
    const newRotation = (0, rotatePlane_1.rotatePlaneToFaceCoordinate)(position, targetCoordinate);
    mirror.rotation.set(newRotation.x, newRotation.y, newRotation.z);
    return mirror;
});
exports.Mirror = Mirror;
const createMirror = (width, height) => __awaiter(void 0, void 0, void 0, function* () {
    const { Reflector } = yield Promise.resolve().then(() => __importStar(require("three/examples/jsm/objects/Reflector.js")));
    const mirror = new Reflector(width, height);
    return mirror;
});
exports.createMirror = createMirror;
