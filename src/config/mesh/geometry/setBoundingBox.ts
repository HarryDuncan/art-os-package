import { Box3, BufferAttribute, BufferGeometry, Vector3 } from "three";

export const getBoundingBoxDimensions = (geometry: BufferGeometry) => {
  // Create a Box3 object
  const boundingBox = new Box3();

  // Set the bounding box to encapsulate the model
  boundingBox.setFromBufferAttribute(
    geometry.getAttribute("position") as BufferAttribute
  );

  // Get the size of the bounding box
  const size = new Vector3();
  boundingBox.getSize(size);
};
