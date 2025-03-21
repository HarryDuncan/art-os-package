export const getRandomInt = (max) => Math.floor(Math.random() * max);
export const easeOut = (t) => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};
export const easeOutSine = (t, b, c, d) => c * Math.sin((t / d) * (Math.PI / 2)) + b;
export const clamp = (number, min, max) => Math.max(min, Math.min(number, max));
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
export const generateEquidistantValues = (start, end, numPoints) => {
    const values = [];
    for (let i = 0; i <= numPoints; i += 1) {
        const t = i / numPoints;
        const value = start + t * (end - start);
        values.push(value);
    }
    return values;
};
