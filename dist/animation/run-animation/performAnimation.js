"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performAnimation = void 0;
const three_1 = require("three");
const animation_constants_1 = require("../animation.constants");
const traverseThroughArray_1 = require("../animation-functions/mesh-animations/traversal/traverseThroughArray");
const rotateMeshAlongAxis_1 = require("../animation-functions/rotation/rotateMeshAlongAxis");
const updateObject_1 = require("../animation-functions/mesh-animations/update-object/updateObject");
const spinMeshAlongAxis_1 = require("../animation-functions/rotation/spinMeshAlongAxis");
const updateTimestampTrigonometric_1 = require("../animation-functions/mesh-animations/trigonometric/updateTimestampTrigonometric");
const maths_1 = require("../../utils/maths/maths");
const moveObject_1 = require("../animation-functions/mesh-animations/move/moveObject");
const fallAnimation_1 = require("../animation-functions/mesh-animations/fall/fallAnimation");
const performAnimation = (animationType, object, progress, animationProperties, count = 0) => {
    if (animationType === animation_constants_1.ANIMATION_TYPES.TRAVERSE) {
        const { curve, animationDurationMilis } = animationProperties;
        if (curve) {
            const currentProg = (0, maths_1.easeOut)(progress / animationDurationMilis) * 100;
            const { x, y, z } = (0, traverseThroughArray_1.traverseThroughtArray)(curve, Number(currentProg.toFixed(0)));
            object.position.set(x, y, z);
        }
    }
    if (animationType === animation_constants_1.ANIMATION_TYPES.ROTATE) {
        const { animationDurationMilis, rotationAxis } = animationProperties;
        const rotation = three_1.MathUtils.degToRad((0, maths_1.easeOut)(progress / animationDurationMilis) * 360);
        (0, rotateMeshAlongAxis_1.rotateMeshAlongAxis)(object, rotationAxis, rotation);
    }
    if (animationType === animation_constants_1.ANIMATION_TYPES.TRIG) {
        const { trigFunctionType } = animationProperties;
        const updatedValue = (0, updateTimestampTrigonometric_1.updateTimeStamp)(progress, trigFunctionType);
        (0, updateObject_1.updateObject)(object, updatedValue, animation_constants_1.OBJECT_UPDATE_PROPERTY.POSITION);
    }
    if (animationType === animation_constants_1.ANIMATION_TYPES.FALL) {
        const { fallParams } = animationProperties;
        (0, fallAnimation_1.fallAnimation)(object, progress, fallParams);
    }
    if (animationType === animation_constants_1.ANIMATION_TYPES.MOVE) {
        const { animationDurationMilis, moveTo, moveFrom } = animationProperties;
        const prog = (0, maths_1.easeOut)(progress / animationDurationMilis);
        (0, moveObject_1.moveObject)(object, prog, moveTo, moveFrom, count);
    }
    if (animationType === animation_constants_1.ANIMATION_TYPES.SPIN) {
        const { rotationAxis, speed } = animationProperties;
        (0, spinMeshAlongAxis_1.spinMeshAlongAxis)(object, rotationAxis, speed);
    }
};
exports.performAnimation = performAnimation;
