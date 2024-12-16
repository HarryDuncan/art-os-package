export const alienTransform = (
  previousPointName: string,
  pointName: string
) => `
	float shift = 2.0
			* cnoise(vec2(3.0 * cos(atan(${previousPointName}.z, ${previousPointName}.x)), 2.0 * uTime + 3.0 * acos(${previousPointName}.y / uRadius)));
	vec4 ${pointName} = ${previousPointName} + normal * shift;
`;
