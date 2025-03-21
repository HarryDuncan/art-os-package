"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animateRotation = void 0;
const degreesToEuler_1 = require("../../../utils/three-dimension-space/degreesToEuler");
const ANIMATION_DURATION = 2000;
const ANIMATION_PAUSE = 1000;
const animateRotation = (rotatedObject) => {
    let startTime;
    function easeOut(t) {
        const theta = t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        return theta;
    }
    function step(timestamp) {
        if (!startTime)
            startTime = timestamp;
        const progress = timestamp - startTime;
        const rotation = (0, degreesToEuler_1.degreesToEuler)(easeOut(progress / ANIMATION_DURATION) * 360);
        const currentRotation = rotatedObject.rotation.z;
        rotatedObject.rotateZ(rotation - currentRotation);
        if (progress < ANIMATION_DURATION) {
            requestAnimationFrame(step);
        }
        else {
            startTime = 0;
            setTimeout(() => {
                requestAnimationFrame(step);
            }, ANIMATION_PAUSE);
        }
    }
    requestAnimationFrame(step);
};
exports.animateRotation = animateRotation;
