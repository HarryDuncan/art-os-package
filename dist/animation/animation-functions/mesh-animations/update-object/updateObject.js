"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateObject = void 0;
const updateObjectPosition_1 = require("./updateObjectPosition");
const position_types_1 = require("../../../../utils/three-dimension-space/position/position.types");
const animation_constants_1 = require("../../../../animation/animation.constants");
const updateObject = (object, updatedValue, objectParameter, axis = position_types_1.AXIS.X) => {
    switch (objectParameter) {
        case animation_constants_1.OBJECT_UPDATE_PROPERTY.POSITION:
        default:
            (0, updateObjectPosition_1.updateObjectPosition)(object, updatedValue, axis);
    }
};
exports.updateObject = updateObject;
