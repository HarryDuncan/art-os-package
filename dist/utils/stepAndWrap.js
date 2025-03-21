export const stepAndWrap = (min, max, current, step = 1) => {
    const newCurrent = current + step;
    if (newCurrent > max) {
        return min;
    }
    if (newCurrent < min) {
        return max;
    }
    return newCurrent;
};
