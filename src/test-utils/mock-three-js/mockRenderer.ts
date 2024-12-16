import { WebGLRenderer } from 'three';

const MockRenderer = () => ({});

export function mockRenderer() {
  return (WebGLRenderer as jest.Mock).mockImplementation(MockRenderer);
}
