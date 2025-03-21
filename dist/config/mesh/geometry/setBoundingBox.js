import { Box3, Vector3 } from "three";
export const getBoundingBoxDimensions = (geometry) => {
    // Create a Box3 object
    const boundingBox = new Box3();
    // Set the bounding box to encapsulate the model
    boundingBox.setFromBufferAttribute(geometry.getAttribute("position"));
    // Get the size of the bounding box
    const size = new Vector3();
    boundingBox.getSize(size);
};
