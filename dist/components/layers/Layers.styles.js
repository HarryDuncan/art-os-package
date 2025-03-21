"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayerImg = exports.LayerOverlay = exports.LayersContainer = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.LayersContainer = styled_components_1.default.div `
  width: 100vw;
  height: 100vh;
  background: transparent;
  position: absolute;
`;
exports.LayerOverlay = styled_components_1.default.div `
  height: 100vh;
  width: 100vw;
  position: absolute;
  background-color: black;
  opacity: 0.3;
  z-index: 2;
  top: 0;
`;
exports.LayerImg = styled_components_1.default.img `
  height: ${({ $height }) => ($height ? `${$height}vh` : "100%")};
  width: ${({ $width }) => ($width ? `${$width}vw` : "100%")};
`;
