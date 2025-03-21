"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dGGX = exports.brdfGgx = exports.vGGXSmithCorrelated = exports.fSchlickFloat = exports.fSchlickVector = exports.linearTosRGB = exports.indirectDiffusePhysical = exports.linearToneMapping = exports.getIBLIrradiance = exports.getLightProbeIrradiance = exports.shGetIrradianceAt = exports.inverseTransformDirection = exports.getDistanceAttenuation = exports.brdfLambert = exports.redirectPhysicalLight = exports.indirectSpecularPhysical = exports.computeMultiScattering = exports.dfgApprox = exports.pointLightInfo = void 0;
exports.pointLightInfo = `
    void getPointLightInfo( PointLight pointLight, GeometricContext geometry, IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
`;
exports.dfgApprox = `vec2 dfgApprox( vec3 normal,  vec3 viewDir, float roughness ) {
	float dotNV = clamp( dot( normal, viewDir ), 0.0, 1.0 );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}`;
exports.computeMultiScattering = `void computeMultiScattering( vec3 normal, vec3 viewDir,  vec3 specularColor,  float specularF90,  float roughness,  vec3 singleScatter,  vec3 multiScatter ) {
	vec2 fab = dfgApprox( normal, viewDir, roughness );
	vec3 Fr = specularColor;
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}`;
exports.indirectSpecularPhysical = `
void indirectSpecularPhysical( vec3 radiance, vec3 irradiance, vec3 clearcoatRadiance, GeometricContext geometry, PhysicalMaterial material, ReflectedLight reflectedLight) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * 0.3183098861837907;
	computeMultiScattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering * 0.0;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance * 0.0;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance * 0.0;
}`;
exports.redirectPhysicalLight = `
    void redirectPhysicalLight( IncidentLight directLight,  GeometricContext geometry, PhysicalMaterial material, ReflectedLight reflectedLight ) {
	float dotNL = clamp( dot( geometry.normal, directLight.direction ), 0.0, 1.0 );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directSpecular += irradiance * brdfGgx( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	reflectedLight.directDiffuse += irradiance * brdfLambert( material.diffuseColor );
}
`;
exports.brdfLambert = ` vec3 brdfLambert(vec3 diffuseColor ) {
	return 0.3183098861837907 * diffuseColor;
}`;
exports.getDistanceAttenuation = `
float getDistanceAttenuation(  float lightDistance,  float cutoffDistance, float decayExponent ) {
    if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
        return pow( clamp( - lightDistance / cutoffDistance + 1.0, 0.0, 1.0 ), decayExponent );
    }
    return 1.0;
}
`;
exports.inverseTransformDirection = `vec3 inverseTransformDirection( vec3 dir, mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}`;
exports.shGetIrradianceAt = `
vec3 shGetIrradianceAt(  vec3 normal,  vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}`;
exports.getLightProbeIrradiance = `
vec3 getLightProbeIrradiance( vec3 lightProbe[9], vec3 normal , mat4 viewMatrix) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix  );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}`;
exports.getIBLIrradiance = ``;
exports.linearToneMapping = `
    vec3 linearToneMapping(vec3 color, float toneMappingExposure){
        return toneMappingExposure * color;
    }
`;
exports.indirectDiffusePhysical = `void indirectDiffusePhysical( vec3 irradiance,  GeometricContext geometry, PhysicalMaterial material, ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * brdfLambert( material.diffuseColor );
}`;
exports.linearTosRGB = `vec4 linearTosRGB( vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`;
exports.fSchlickVector = `vec3 fSchlickVector(vec3 f0, float f90, float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * (( 1.0 - fresnel ) + ( f90 * fresnel ));
}`;
exports.fSchlickFloat = `float fSchlickFloat( float f0, float f90, float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}`;
exports.vGGXSmithCorrelated = `float vGGXSmithCorrelated( float alpha, float dotNL, float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, 1e-6 );
}`;
exports.brdfGgx = `vec3 brdfGgx( vec3 lightDir,vec3 viewDir, vec3 normal, vec3 f0, float f90, float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = clamp( dot( normal, lightDir ), 0.0, 1.0 );
	float dotNV = clamp( dot( normal, viewDir ), 0.0, 1.0 );
	float dotNH = clamp( dot( normal, halfDir ), 0.0, 1.0 );
	float dotVH = clamp( dot( viewDir, halfDir ), 0.0, 1.0 );
	vec3 F = fSchlickVector( f0, f90, dotVH );
	float V = vGGXSmithCorrelated( alpha, dotNL, dotNV );
	float D = dGGX( alpha, dotNH );
	return F * ( V * D );
}`;
exports.dGGX = `float dGGX( float alpha, float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return 0.3183098861837907 * a2 / pow2( denom );
}`;
