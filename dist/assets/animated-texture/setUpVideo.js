"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupVideo = void 0;
const setupVideo = (path, identifier) => {
    const video = document.createElement("video");
    const root = document.getElementById("append-container");
    const videoId = document.getElementById(identifier);
    if (!root) {
        alert("No append container found");
    }
    if (!root || videoId)
        return;
    root.appendChild(video);
    video.id = identifier;
    video.width = 600;
    video.height = 600;
    video.preload = "auto";
    video.playsInline = true;
    video.muted = true;
    video.loop = true;
    video.playbackRate = 0.2;
    // Waiting for these 2 events ensures
    // there is data in the video
    video.src = path;
    setTimeout(() => {
        video
            .play()
            .then((_) => {
            // Automatic playback started!
            // Show playing UI.
        })
            .catch((error) => {
            console.error(error);
        });
    }, 3000);
    return video;
};
exports.setupVideo = setupVideo;
