import { Mesh, SphereGeometry } from "three";
import { DEFAULT_ROTATION } from "../../utils/three-dimension-space/threeDSpace.constants";
import { DEFAULT_MATERIAL } from "../../config/material/materials.default";
export const SphericalBackground = ({ id, position, radius, rotation = DEFAULT_ROTATION, material = DEFAULT_MATERIAL, }) => {
    const sphereGeometry = new SphereGeometry(radius, 32, 16);
    const sphere = new Mesh(sphereGeometry, material);
    sphere.name = id;
    const { x, y, z } = position;
    sphere.position.set(x, y, z);
    setRotation(sphere, rotation);
    return sphere;
};
const setRotation = (object, rotation) => {
    const { x, y, z } = rotation;
    object.rotation.set(x, y, z);
};
