import { ImageLoader } from "three";
export const loadImage = (path) => new Promise((resolve) => {
    const textureLoader = new ImageLoader();
    textureLoader.load(path, (data) => {
        resolve(data);
    });
});
