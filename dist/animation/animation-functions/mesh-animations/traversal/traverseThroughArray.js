import { Vector3 } from "three";
export const traverseThroughtArray = (points, percentage) => {
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
    return new Vector3(x, y, z);
};
