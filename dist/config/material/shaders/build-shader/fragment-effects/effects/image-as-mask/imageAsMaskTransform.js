export const imageAsMaskTransform = () => {
    const transform = `

   if(vHidePixel == 0.0 ){
       discard;
  }

  `;
    return {
        transform,
    };
};
