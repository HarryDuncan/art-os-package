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
exports.loadObject = void 0;
const OBJLoader_1 = require("three/examples/jsm/loaders/OBJLoader");
const loadObject = (path) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        const objectLoader = new OBJLoader_1.OBJLoader();
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
exports.loadObject = loadObject;
