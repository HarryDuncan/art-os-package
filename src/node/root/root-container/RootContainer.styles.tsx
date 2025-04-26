import styled from "styled-components";

export const Root = styled.div<{
  $height: string;
  $width: string;
  $backgroundColor?: string;
  $backgroundUrl?: string;
  $fixed?: boolean;
  $position?: string;
  $cursor?: string;
}>`
  height: ${({ $height }) => $height};
  width: ${({ $width }) => $width};
  overflow: hidden;
  margin: 0 auto;
  cursor: ${({ $cursor }) => $cursor ?? "pointer"};
  position: ${({ $position }) => $position ?? "relative"};
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor ?? "transparent"};
  background-image: ${({ $backgroundUrl }) =>
    $backgroundUrl ? `url(${$backgroundUrl})` : "none"};
  background-size: cover;
  & canvas {
    margin: 0 auto;
  }
`;
