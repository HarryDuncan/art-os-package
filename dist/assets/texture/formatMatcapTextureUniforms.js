export const formatMatcapTextureUniforms = (uniforms, matcapData) => (Object.assign(Object.assign({}, uniforms), { matcap: { value: matcapData } }));
