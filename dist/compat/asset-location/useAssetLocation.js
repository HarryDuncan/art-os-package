"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAssetLocation = void 0;
const react_1 = require("react");
const useAssetLocation = (configData, staticContentRootUrl = "") => {
    return (0, react_1.useMemo)(() => configData === null || configData === void 0 ? void 0 : configData.map((config) => {
        var _a;
        const updatedAssets = (_a = config.assets) === null || _a === void 0 ? void 0 : _a.map((asset) => {
            const path = staticContentRootUrl.length
                ? `/${removeElipse(asset.path)}`
                : asset.path;
            return Object.assign(Object.assign({}, asset), { path: `${staticContentRootUrl}${path}` });
        });
        return Object.assign(Object.assign({}, config), { assets: updatedAssets });
    }), [staticContentRootUrl, configData]);
};
exports.useAssetLocation = useAssetLocation;
const removeElipse = (inputString) => inputString.replace(/\.\.\//g, "");
