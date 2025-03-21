import { useEffect } from "react";
export const useInitializeNode = (containerRef, renderer) => useEffect(() => {
    if (containerRef === null || containerRef === void 0 ? void 0 : containerRef.current) {
        const container = containerRef.current;
        container.appendChild(renderer.domElement);
    }
}, [containerRef, renderer]);
