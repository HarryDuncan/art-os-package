"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInitializeNode = void 0;
const react_1 = require("react");
const useInitializeNode = (containerRef, renderer) => (0, react_1.useEffect)(() => {
    if (containerRef === null || containerRef === void 0 ? void 0 : containerRef.current) {
        const container = containerRef.current;
        container.appendChild(renderer.domElement);
    }
}, [containerRef, renderer]);
exports.useInitializeNode = useInitializeNode;
