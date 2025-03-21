import { ShaderPropertyValueTypes } from "../../../../constants/buildShader.consts";
import { formatVertexParameters } from "../../../../helpers/formatVertexParameters";
import { DEFAULT_EXPLODE_PARAMETERS, EXPLODE_FUNCTIONS, EXPLODE_UNIFORMS, EXPLODE_VARYINGS, } from "./explode.consts";
import { explodeTransform } from "./explodeTransform";
export const explode = (effectProps) => {
    const explodeEffectProps = formatVertexParameters(effectProps !== null && effectProps !== void 0 ? effectProps : {}, DEFAULT_EXPLODE_PARAMETERS);
    const uniformConfig = EXPLODE_UNIFORMS;
    const varyingConfig = EXPLODE_VARYINGS;
    const transformation = explodeTransform(explodeEffectProps);
    const requiredFunctions = EXPLODE_FUNCTIONS;
    const attributeConfig = [
        { id: "randomAngle", valueType: ShaderPropertyValueTypes.FLOAT },
        { id: "signDirection", valueType: ShaderPropertyValueTypes.FLOAT },
    ];
    return {
        attributeConfig,
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig,
    };
};
