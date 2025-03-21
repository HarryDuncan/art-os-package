var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FILE_TYPES } from "../../consts";
import { loadGLTF } from "../geometry/load-model/loadGLTF";
export const loadAdvancedScene = (path, fileType) => __awaiter(void 0, void 0, void 0, function* () {
    switch (fileType) {
        case FILE_TYPES.MODELS.GLTF:
        case FILE_TYPES.MODELS.GLB: {
            const gltf = yield loadGLTF(path);
            return gltf;
        }
        case "":
        default: {
            console.warn(`no file type specified for ${fileType}`);
            return null;
        }
    }
});
