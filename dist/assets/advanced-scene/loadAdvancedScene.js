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
exports.loadAdvancedScene = void 0;
const consts_1 = require("../../consts");
const loadGLTF_1 = require("../geometry/load-model/loadGLTF");
const loadAdvancedScene = (path, fileType) => __awaiter(void 0, void 0, void 0, function* () {
    switch (fileType) {
        case consts_1.FILE_TYPES.MODELS.GLTF:
        case consts_1.FILE_TYPES.MODELS.GLB: {
            const gltf = yield (0, loadGLTF_1.loadGLTF)(path);
            return gltf;
        }
        case "":
        default: {
            console.warn(`no file type specified for ${fileType}`);
            return null;
        }
    }
});
exports.loadAdvancedScene = loadAdvancedScene;
