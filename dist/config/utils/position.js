export const getPosition = (positionConfig) => {
    var _a, _b, _c;
    return {
        x: (_a = positionConfig.x) !== null && _a !== void 0 ? _a : 0,
        y: (_b = positionConfig.y) !== null && _b !== void 0 ? _b : 0,
        z: (_c = positionConfig.z) !== null && _c !== void 0 ? _c : 0,
    };
};
