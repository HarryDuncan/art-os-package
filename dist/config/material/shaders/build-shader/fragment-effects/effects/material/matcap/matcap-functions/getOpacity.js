export const getOpacity = (hasOpacity) => {
    if (hasOpacity) {
        return `matcapColor.a * opacity`;
    }
    return `matcapColor.a`;
};
