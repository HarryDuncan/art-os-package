"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoundingBoxDimensions = void 0;
const three_1 = require("three");
const getBoundingBoxDimensions = (geometry) => {
    // Create a Box3 object
    const boundingBox = new three_1.Box3();
    // Set the bounding box to encapsulate the model
    boundingBox.setFromBufferAttribute(geometry.getAttribute("position"));
    // Get the size of the bounding box
    const size = new three_1.Vector3();
    boundingBox.getSize(size);
};
exports.getBoundingBoxDimensions = getBoundingBoxDimensions;
