"use strict";
/* eslint import/namespace: ['error', { allowComputed: true }] */
Object.defineProperty(exports, "__esModule", { value: true });
exports.importShader = void 0;
const importShader = (shaderId, vertexShaderId, fragmentShaderId) => {
    try {
        const { fragmentShader: defaultFragmentShader, vertexShader, defaultUniforms: setUpDefaultUniforms,
        // @ts-ignore - not ideal but will replace with build shader
         } = Shaders[shaderId];
        if (vertexShaderId) {
            // todo -import vertex shader
        }
        const fragmentShader = getFragmentShader(defaultFragmentShader, fragmentShaderId);
        return { fragmentShader, vertexShader, setUpDefaultUniforms };
    }
    catch (_a) {
        console.error(`${shaderId} not a valid shader`);
        return { fragmentShader: "", vertexShader: "", setUpDefaultUniforms: null };
    }
};
exports.importShader = importShader;
const getFragmentShader = (defaultFragmentShader, fragmentShaderId) => {
    if (fragmentShaderId) {
        // @ts-ignore - not ideal but will replace with build shader
        const { fragmentShader } = Shaders[fragmentShaderId];
        return fragmentShader;
    }
    return defaultFragmentShader;
};
