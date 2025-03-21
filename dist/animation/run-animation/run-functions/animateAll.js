"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animateAll = void 0;
const performAnimation_1 = require("../performAnimation");
const animateAll = (animationProperties, animatedObjects) => {
    const { animationDurationMilis, animationType, repeatAnimation, animationPauseMilis, } = animationProperties;
    let startTime;
    let count = 0;
    function step(timestamp) {
        if (!startTime)
            startTime = timestamp;
        const progress = timestamp - startTime;
        animatedObjects.forEach((object) => {
            (0, performAnimation_1.performAnimation)(animationType, object, progress, animationProperties, count);
        });
        if (progress < animationDurationMilis || animationDurationMilis === -1) {
            requestAnimationFrame(step);
        }
        else {
            startTime = 0;
            count += 1;
            if (repeatAnimation) {
                setTimeout(() => {
                    requestAnimationFrame(step);
                }, animationPauseMilis);
            }
        }
    }
    requestAnimationFrame(step);
};
exports.animateAll = animateAll;
