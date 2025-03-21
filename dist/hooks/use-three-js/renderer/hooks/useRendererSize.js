import { useWindowState } from "../../../../compat/window-state/windowStateProvider";
export const useRendererSize = (rendererParams) => {
    const { state: { windowSize: { width, height }, }, } = useWindowState();
    const { size } = rendererParams;
    if (size)
        return { width: size.width, height: size.height };
    return { width, height };
};
