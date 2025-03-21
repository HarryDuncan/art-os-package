import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
export const loadFont = (fontUrl) => new Promise((resolve) => {
    const loader = new FontLoader();
    loader.load(fontUrl, (response) => {
        resolve(response.data);
    });
});
