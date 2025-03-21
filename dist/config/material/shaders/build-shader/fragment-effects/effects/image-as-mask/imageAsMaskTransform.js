"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageAsMaskTransform = void 0;
const imageAsMaskTransform = () => {
    const transform = `

   if(vHidePixel == 0.0 ){
       discard;
  }

  `;
    return {
        transform,
    };
};
exports.imageAsMaskTransform = imageAsMaskTransform;
