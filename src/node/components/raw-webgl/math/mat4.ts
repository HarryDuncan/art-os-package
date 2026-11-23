// Column-major 4x4 / 3x3 helpers matching WebGL (and three.js `elements`)
// layout. Every function writes into `out` so callers can preallocate and
// keep the render loop allocation-free.

export type Vec3 = { x: number; y: number; z: number };

export const createMat4 = () => identity(new Float32Array(16));
export const createMat3 = () =>
  new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);

export const identity = (out: Float32Array) => {
  out.fill(0);
  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
};

// out = a * b
export const multiply = (
  out: Float32Array,
  a: Float32Array,
  b: Float32Array,
) => {
  const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  for (let col = 0; col < 4; col += 1) {
    const b0 = b[col * 4];
    const b1 = b[col * 4 + 1];
    const b2 = b[col * 4 + 2];
    const b3 = b[col * 4 + 3];
    out[col * 4] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
    out[col * 4 + 1] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
    out[col * 4 + 2] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
    out[col * 4 + 3] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;
  }
  return out;
};

// Translation * rotation, rotation as radians applied in three.js's default
// Euler order (XYZ), so the same mesh config lands in the same place in both
// engines.
export const compose = (
  out: Float32Array,
  position: Vec3,
  rotation: Vec3,
) => {
  const a = Math.cos(rotation.x), b = Math.sin(rotation.x);
  const c = Math.cos(rotation.y), d = Math.sin(rotation.y);
  const e = Math.cos(rotation.z), f = Math.sin(rotation.z);
  const ae = a * e, af = a * f, be = b * e, bf = b * f;

  out[0] = c * e;
  out[4] = -c * f;
  out[8] = d;
  out[1] = af + be * d;
  out[5] = ae - bf * d;
  out[9] = -b * c;
  out[2] = bf - ae * d;
  out[6] = be + af * d;
  out[10] = a * c;

  out[3] = 0;
  out[7] = 0;
  out[11] = 0;
  out[12] = position.x;
  out[13] = position.y;
  out[14] = position.z;
  out[15] = 1;
  return out;
};

// Same projection as three.js `PerspectiveCamera` (fov in degrees, vertical).
export const perspective = (
  out: Float32Array,
  fovDegrees: number,
  aspect: number,
  near: number,
  far: number,
) => {
  const f = 1 / Math.tan((fovDegrees * Math.PI) / 360);
  const nf = 1 / (near - far);
  out.fill(0);
  out[0] = f / aspect;
  out[5] = f;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[14] = 2 * far * near * nf;
  return out;
};

export const ortho = (
  out: Float32Array,
  left: number,
  right: number,
  bottom: number,
  top: number,
  near: number,
  far: number,
) => {
  const lr = 1 / (left - right);
  const bt = 1 / (bottom - top);
  const nf = 1 / (near - far);
  out.fill(0);
  out[0] = -2 * lr;
  out[5] = -2 * bt;
  out[10] = 2 * nf;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
};

// View matrix (inverse camera world matrix) for a camera at `eye` facing
// `target`, Y up. With no target the camera looks down -Z, as an untouched
// three.js camera does.
export const lookAt = (out: Float32Array, eye: Vec3, target?: Vec3) => {
  let zx = 0, zy = 0, zz = 1;
  if (target) {
    zx = eye.x - target.x;
    zy = eye.y - target.y;
    zz = eye.z - target.z;
    const len = Math.hypot(zx, zy, zz);
    if (len === 0) {
      zx = 0;
      zy = 0;
      zz = 1;
    } else {
      zx /= len;
      zy /= len;
      zz /= len;
    }
  }

  // x = up(0,1,0) x z; nudge up when looking straight along Y.
  let xx = zz, xy = 0, xz = -zx;
  let xLen = Math.hypot(xx, xy, xz);
  if (xLen === 0) {
    xx = 1;
    xy = 0;
    xz = 0;
    xLen = 1;
  }
  xx /= xLen;
  xy /= xLen;
  xz /= xLen;

  const yx = zy * xz - zz * xy;
  const yy = zz * xx - zx * xz;
  const yz = zx * xy - zy * xx;

  out[0] = xx;
  out[1] = yx;
  out[2] = zx;
  out[3] = 0;
  out[4] = xy;
  out[5] = yy;
  out[6] = zy;
  out[7] = 0;
  out[8] = xz;
  out[9] = yz;
  out[10] = zz;
  out[11] = 0;
  out[12] = -(xx * eye.x + xy * eye.y + xz * eye.z);
  out[13] = -(yx * eye.x + yy * eye.y + yz * eye.z);
  out[14] = -(zx * eye.x + zy * eye.y + zz * eye.z);
  out[15] = 1;
  return out;
};

// Inverse-transpose of the upper 3x3, i.e. three.js `Matrix3.getNormalMatrix`.
export const normalFromMat4 = (out: Float32Array, m: Float32Array) => {
  const a00 = m[0], a01 = m[1], a02 = m[2];
  const a10 = m[4], a11 = m[5], a12 = m[6];
  const a20 = m[8], a21 = m[9], a22 = m[10];

  const b01 = a22 * a11 - a12 * a21;
  const b11 = -a22 * a10 + a12 * a20;
  const b21 = a21 * a10 - a11 * a20;
  const det = a00 * b01 + a01 * b11 + a02 * b21;
  if (det === 0) {
    out.set([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    return out;
  }
  const inv = 1 / det;

  out[0] = b01 * inv;
  out[1] = (-a22 * a01 + a02 * a21) * inv;
  out[2] = (a12 * a01 - a02 * a11) * inv;
  out[3] = b11 * inv;
  out[4] = (a22 * a00 - a02 * a20) * inv;
  out[5] = (-a12 * a00 + a02 * a10) * inv;
  out[6] = b21 * inv;
  out[7] = (-a21 * a00 + a01 * a20) * inv;
  out[8] = (a11 * a00 - a01 * a10) * inv;

  // transpose
  let t = out[1];
  out[1] = out[3];
  out[3] = t;
  t = out[2];
  out[2] = out[6];
  out[6] = t;
  t = out[5];
  out[5] = out[7];
  out[7] = t;
  return out;
};
