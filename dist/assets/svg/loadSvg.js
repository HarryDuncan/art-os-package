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
exports.LoadSvg = void 0;
const SVGLoader_1 = require("three/examples/jsm/loaders/SVGLoader");
const LoadSvg = (path) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        const loader = new SVGLoader_1.SVGLoader();
        loader.load(path, (_data) => {
            // todo - svg loader - waiting until i need to do it
            resolve("");
        });
    });
});
exports.LoadSvg = LoadSvg;
