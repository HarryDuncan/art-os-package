import { FRAG_COLOR_NAME, } from "../../../fragmentEffects.consts";
export const physicalMaterialTransform = () => {
    const transform = `
    
  	vec4 diffuseColor = vec4( uDiffuse, uOpacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = uEmissive;
    vec4 sampledDiffuseColor = vec4(transition(vUv, 0.5 + 0.5 * sin(uTime)).rgb, 1.0);
    diffuseColor *= sampledDiffuseColor;
    float roughnessFactor = uRoughness;
    float metalnessFactor = uMetalness;
	vec3 normal = calculateNormal(vPosition);
    vec3 geometryNormal = normal;
    PhysicalMaterial material;
    material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
    vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
    float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
    material.roughness = max( roughnessFactor, 0.0525 );
    material.roughness += geometryRoughness;
    material.roughness = min( material.roughness, 1.0 );
	material.ior = uIor;
    float specularIntensityFactor = uSpecularIntensity;
    vec3 specularColorFactor = uSpecularColor;
    material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );

    GeometricContext geometry;
    geometry.position = vPosition;
    geometry.normal = normal;
    geometry.viewDir = normalize( vPosition );
    IncidentLight directLight;
	PointLight pointLight;
	
    // pointLight = uPointLight[ 0 ];
    // getPointLightInfo( pointLight, geometry, directLight );
    // redirectPhysicalLight( directLight, geometry, material, reflectedLight );

    //  pointLight = uPointLight[ 1 ];
    //  getPointLightInfo( pointLight, geometry, directLight );
    //  redirectPhysicalLight( directLight, geometry, material, reflectedLight );

    // pointLight = uPointLight[ 2 ];
    // getPointLightInfo( pointLight, geometry, directLight );
    // RE_Direct_Physical_1723231464811_0( directLight, geometry, material, reflectedLight );

	vec3 iblIrradiance = vec3( 0.2 );
	vec3 irradiance = uAmbientLightColor;
    irradiance += getLightProbeIrradiance( uLightProbe, geometry.normal , vModelViewMatrix);
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 1.0 );
    indirectDiffusePhysical( irradiance, geometry, material, reflectedLight );
	indirectSpecularPhysical( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
    diffuseColor.a = 0.2;
    ${FRAG_COLOR_NAME} = vec4( outgoingLight, diffuseColor.a );
    ${FRAG_COLOR_NAME}.rgb = linearToneMapping( ${FRAG_COLOR_NAME}.rgb ,uToneMappingExposure);
   ${FRAG_COLOR_NAME} = linearTosRGB( ${FRAG_COLOR_NAME} );
    `;
    return { transform };
};
