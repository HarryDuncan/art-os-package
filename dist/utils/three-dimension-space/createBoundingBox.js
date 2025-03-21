export const createBoundingBox = ({ center, width, height, depth, }) => {
    var _a, _b, _c;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const halfDepth = depth / 2;
    const bboxCenter = {
        x: (_a = center.x) !== null && _a !== void 0 ? _a : 0,
        y: (_b = center.y) !== null && _b !== void 0 ? _b : 0,
        z: (_c = center.z) !== null && _c !== void 0 ? _c : 0,
    };
    return {
        min: {
            x: bboxCenter.x - halfWidth,
            y: bboxCenter.y - halfHeight,
            z: bboxCenter.z - halfDepth,
        },
        max: {
            x: bboxCenter.x + halfWidth,
            y: bboxCenter.y + halfHeight,
            z: bboxCenter.z + halfDepth,
        },
    };
};
