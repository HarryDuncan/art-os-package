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
exports.loadModel = void 0;
const consts_1 = require("../../../consts");
const loadGLTF_1 = require("./loadGLTF");
const loadObject_1 = require("./loadObject");
const loadModel = (path, fileType) => __awaiter(void 0, void 0, void 0, function* () {
    switch (fileType) {
        case consts_1.FILE_TYPES.MODELS.GLTF:
        case consts_1.FILE_TYPES.MODELS.GLB: {
            const gltf = yield (0, loadGLTF_1.loadGLTF)(path);
            return gltf.scene;
        }
        case consts_1.FILE_TYPES.MODELS.OBJ: {
            const object = yield (0, loadObject_1.loadObject)(path);
            return object;
        }
        case "":
        default: {
            console.warn(`no file type specified for ${fileType}`);
            return null;
        }
    }
});
exports.loadModel = loadModel;
