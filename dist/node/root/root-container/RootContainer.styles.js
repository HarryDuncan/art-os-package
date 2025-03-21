import styled from "styled-components";
export const Root = styled.div `
  height: ${({ $height }) => $height};
  width: ${({ $width }) => $width};
  overflow: hidden;
  margin: 0 auto;
  cursor: ${({ $cursor }) => $cursor !== null && $cursor !== void 0 ? $cursor : "none"};
  position: ${({ $position }) => $position !== null && $position !== void 0 ? $position : "relative"};
  background-color: ${({ $backgroundColor }) => $backgroundColor !== null && $backgroundColor !== void 0 ? $backgroundColor : "transparent"};
  background-image: ${({ $backgroundUrl }) => $backgroundUrl ? `url(${$backgroundUrl})` : "none"};
  background-size: cover;
  & canvas {
    margin: 0 auto;
  }
`;
