var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
export const LoadSvg = (path) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        const loader = new SVGLoader();
        loader.load(path, (_data) => {
            // todo - svg loader - waiting until i need to do it
            resolve("");
        });
    });
});
