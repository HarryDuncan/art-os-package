import styled from "styled-components";
export const LayersContainer = styled.div `
  width: 100vw;
  height: 100vh;
  background: transparent;
  position: absolute;
`;
export const LayerOverlay = styled.div `
  height: 100vh;
  width: 100vw;
  position: absolute;
  background-color: black;
  opacity: 0.3;
  z-index: 2;
  top: 0;
`;
export const LayerImg = styled.img `
  height: ${({ $height }) => ($height ? `${$height}vh` : "100%")};
  width: ${({ $width }) => ($width ? `${$width}vw` : "100%")};
`;
