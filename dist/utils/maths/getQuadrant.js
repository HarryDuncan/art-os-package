import { Vector4 } from "three";
const QUADRANT = {
    ONE: "ONE",
    TWO: "TWO",
    THREE: "THREE",
    FOUR: "FOUR",
};
export function getQuadrant(degree) {
    if (degree >= 0 && degree < 90) {
        return QUADRANT.ONE;
    }
    if (degree >= 90 && degree < 180) {
        return QUADRANT.TWO;
    }
    if (degree >= 180 && degree < 270) {
        return QUADRANT.THREE;
    }
    return QUADRANT.FOUR;
}
export const getCalculationWeightingForQuadrant = (rotationRadians) => {
    // TODO - Make work if rotation is in the other direction
    const rotationDegree = (rotationRadians * 180) / Math.PI;
    const reducedRotation = rotationDegree % 360;
    const quadrant = getQuadrant(reducedRotation);
    switch (quadrant) {
        case QUADRANT.ONE: {
            return new Vector4(Math.cos(rotationRadians), Math.sin(rotationRadians), 0, 0);
        }
        case QUADRANT.TWO: {
            const twoRotation = toRadians(Math.abs(reducedRotation) - 90);
            return new Vector4(0, Math.cos(twoRotation), Math.sin(twoRotation), 0);
        }
        case QUADRANT.THREE: {
            const radianThree = toRadians(Math.abs(reducedRotation) - 180);
            return new Vector4(0, 0, Math.cos(radianThree), Math.sin(radianThree));
        }
        case QUADRANT.FOUR:
        default: {
            const radianFour = toRadians(Math.abs(reducedRotation) - 270);
            return new Vector4(Math.sin(radianFour), 0, 0, Math.cos(radianFour));
        }
    }
};
const toRadians = (degree) => degree * (Math.PI / 180);
