var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
export const loadObject = (path) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        const objectLoader = new OBJLoader();
        objectLoader.load(path, (object) => {
            const result = object;
            resolve(result);
        }, 
        // On Progress
        () => null, 
        // On Error
        () => {
            console.error("error loading object");
        });
    });
});
