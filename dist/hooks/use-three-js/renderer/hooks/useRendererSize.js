"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRendererSize = void 0;
const windowStateProvider_1 = require("../../../../compat/window-state/windowStateProvider");
const useRendererSize = (rendererParams) => {
    const { state: { windowSize: { width, height }, }, } = (0, windowStateProvider_1.useWindowState)();
    const { size } = rendererParams;
    if (size)
        return { width: size.width, height: size.height };
    return { width, height };
};
exports.useRendererSize = useRendererSize;
