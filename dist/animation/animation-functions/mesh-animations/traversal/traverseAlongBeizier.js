import { Vector3 } from "three";
export const traversalFunction = (props, object) => {
    const { x, y, z } = traverseAlongBezier(props.start, props.end, props.curveSize, props.t);
    object.position.set(x, y, z);
};
export const traverseAlongBezier = (start, end, curveSize, t) => {
    // Calculate control points for Bezier curve
    const startToEnd = end.clone().sub(start);
    const mid = start
        .clone()
        .add(end)
        .multiplyScalar(0.5);
    const perpendicular = startToEnd
        .clone()
        .applyAxisAngle(new Vector3(0, 0, 1), Math.PI / 2)
        .normalize();
    const control1 = mid
        .clone()
        .add(perpendicular.clone().multiplyScalar(curveSize * startToEnd.length()));
    const control2 = mid
        .clone()
        .sub(perpendicular.clone().multiplyScalar(curveSize * startToEnd.length()));
    // Calculate point on Bezier curve using t parameter
    const tSquared = t * t;
    const tCubed = tSquared * t;
    const oneMinusT = 1 - t;
    const oneMinusTSquared = oneMinusT * oneMinusT;
    const oneMinusTCubed = oneMinusTSquared * oneMinusT;
    const point = start
        .clone()
        .multiplyScalar(oneMinusTCubed)
        .add(control1.clone().multiplyScalar(3 * oneMinusTSquared * t))
        .add(control2.clone().multiplyScalar(3 * oneMinusT * tSquared))
        .add(end.clone().multiplyScalar(tCubed));
    return point;
};
