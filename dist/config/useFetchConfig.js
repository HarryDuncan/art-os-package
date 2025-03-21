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
exports.useFetchConfig = void 0;
const react_1 = require("react");
const useAssetLocation_1 = require("../compat/asset-location/useAssetLocation");
const useFetchConfig = (filePath) => {
    const [data, setData] = (0, react_1.useState)(null);
    const configuredData = (0, useAssetLocation_1.useAssetLocation)(data);
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            if (!data && filePath.length) {
                try {
                    const response = yield fetch(filePath);
                    if (!response.ok) {
                        throw new Error("Failed to fetch JSON file");
                    }
                    const jsonData = yield response.json();
                    setData(jsonData);
                }
                catch (error) {
                    console.error(error);
                }
            }
        });
        if (filePath) {
            fetchData();
        }
    }, [filePath, data]);
    return configuredData;
};
exports.useFetchConfig = useFetchConfig;
