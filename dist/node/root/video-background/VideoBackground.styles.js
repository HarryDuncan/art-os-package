"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoBackgroundContainer = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.VideoBackgroundContainer = styled_components_1.default.div `
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
