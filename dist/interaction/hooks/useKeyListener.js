"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKeyListener = void 0;
const react_1 = require("react");
const useKeyListener = (key, onKeyPress) => {
    (0, react_1.useEffect)(() => {
        const handleKeyPress = (event) => {
            if (event.key === key) {
                onKeyPress();
            }
        };
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [key, onKeyPress]);
};
exports.useKeyListener = useKeyListener;
