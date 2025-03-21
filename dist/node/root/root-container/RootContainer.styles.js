"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Root = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.Root = styled_components_1.default.div `
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
