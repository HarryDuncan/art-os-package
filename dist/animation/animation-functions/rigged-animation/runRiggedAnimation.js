"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runRiggedAnimation = void 0;
const three_1 = require("three");
const runRiggedAnimation = (_riggedAnimationConfig, selectedMesh) => {
    selectedMesh.forEach((mesh) => {
        const { animations } = mesh;
        const mixer = new three_1.AnimationMixer(mesh);
        const clip = three_1.AnimationClip.findByName(animations, "fly-trap");
        if (clip) {
            const action = mixer.clipAction(clip);
            action.play();
        }
        else {
            console.error(`Animation clip  not found for mesh.`);
            return;
        }
        function step(timestamp) {
            const t = Math.max(Math.min(Math.cos(timestamp * 0.001), 0.9), 0.1) * 0.01;
            mixer.update(t);
            requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    });
};
exports.runRiggedAnimation = runRiggedAnimation;
