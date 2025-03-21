"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseThroughtArray = void 0;
const three_1 = require("three");
const traverseThroughtArray = (points, percentage) => {
    // Calculate index and interpolation factor
    const index = (percentage / 100) * (points.length - 1);
    const fraction = index - Math.floor(index);
    // Calculate interpolated point
    const p0 = points[Math.floor(index)];
    const p1 = points[Math.ceil(index)];
    const x = p0.x + fraction * (p1.x - p0.x);
    const y = p0.y + fraction * (p1.y - p0.y);
    const z = p0.z + fraction * (p1.z - p0.z);
    // Return interpolated point
    return new three_1.Vector3(x, y, z);
};
exports.traverseThroughtArray = traverseThroughtArray;
