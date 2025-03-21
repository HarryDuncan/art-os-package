import styled from "styled-components";
export const VideoBackgroundContainer = styled.div `
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  video {
    object-fit: fill;
    overflow: visible;
    height: 100%;
    width: 100%;
  }
`;
