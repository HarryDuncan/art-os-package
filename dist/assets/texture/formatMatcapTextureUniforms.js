"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMatcapTextureUniforms = void 0;
const formatMatcapTextureUniforms = (uniforms, matcapData) => (Object.assign(Object.assign({}, uniforms), { matcap: { value: matcapData } }));
exports.formatMatcapTextureUniforms = formatMatcapTextureUniforms;
