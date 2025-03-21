import { MathUtils } from "three";
import { ANIMATION_TYPES, OBJECT_UPDATE_PROPERTY, } from "../animation.constants";
import { traverseThroughtArray } from "../animation-functions/mesh-animations/traversal/traverseThroughArray";
import { rotateMeshAlongAxis } from "../animation-functions/rotation/rotateMeshAlongAxis";
import { updateObject } from "../animation-functions/mesh-animations/update-object/updateObject";
import { spinMeshAlongAxis } from "../animation-functions/rotation/spinMeshAlongAxis";
import { updateTimeStamp } from "../animation-functions/mesh-animations/trigonometric/updateTimestampTrigonometric";
import { easeOut } from "../../utils/maths/maths";
import { moveObject } from "../animation-functions/mesh-animations/move/moveObject";
import { fallAnimation } from "../animation-functions/mesh-animations/fall/fallAnimation";
export const performAnimation = (animationType, object, progress, animationProperties, count = 0) => {
    if (animationType === ANIMATION_TYPES.TRAVERSE) {
        const { curve, animationDurationMilis } = animationProperties;
        if (curve) {
            const currentProg = easeOut(progress / animationDurationMilis) * 100;
            const { x, y, z } = traverseThroughtArray(curve, Number(currentProg.toFixed(0)));
            object.position.set(x, y, z);
        }
    }
    if (animationType === ANIMATION_TYPES.ROTATE) {
        const { animationDurationMilis, rotationAxis } = animationProperties;
        const rotation = MathUtils.degToRad(easeOut(progress / animationDurationMilis) * 360);
        rotateMeshAlongAxis(object, rotationAxis, rotation);
    }
    if (animationType === ANIMATION_TYPES.TRIG) {
        const { trigFunctionType } = animationProperties;
        const updatedValue = updateTimeStamp(progress, trigFunctionType);
        updateObject(object, updatedValue, OBJECT_UPDATE_PROPERTY.POSITION);
    }
    if (animationType === ANIMATION_TYPES.FALL) {
        const { fallParams } = animationProperties;
        fallAnimation(object, progress, fallParams);
    }
    if (animationType === ANIMATION_TYPES.MOVE) {
        const { animationDurationMilis, moveTo, moveFrom } = animationProperties;
        const prog = easeOut(progress / animationDurationMilis);
        moveObject(object, prog, moveTo, moveFrom, count);
    }
    if (animationType === ANIMATION_TYPES.SPIN) {
        const { rotationAxis, speed } = animationProperties;
        spinMeshAlongAxis(object, rotationAxis, speed);
    }
};
