"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chainAnimation = void 0;
const performAnimation_1 = require("../performAnimation");
const maths_1 = require("../../../utils/maths/maths");
const chainAnimation = (animationProperties, animatedObjects) => {
    const { animationDurationMilis, animationType, animationPauseMilis, repeatAnimation, } = animationProperties;
    let startTime;
    let currentItemIndex = 0;
    function step(timestamp) {
        const object = animatedObjects[currentItemIndex];
        if (!startTime)
            startTime = timestamp;
        const progress = timestamp - startTime;
        (0, performAnimation_1.performAnimation)(animationType, object, progress, animationProperties);
        if (progress < animationDurationMilis || animationDurationMilis === -1) {
            requestAnimationFrame(step);
        }
        else {
            startTime = 0;
            currentItemIndex = (0, maths_1.stepAndWrap)(0, animatedObjects.length - 1, currentItemIndex);
            if (repeatAnimation) {
                setTimeout(() => {
                    step(timestamp + animationPauseMilis);
                }, animationPauseMilis);
            }
        }
    }
    requestAnimationFrame(step);
};
exports.chainAnimation = chainAnimation;
