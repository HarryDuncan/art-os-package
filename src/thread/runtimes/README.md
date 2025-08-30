# Post Effect Runtime System

This directory contains the runtime system for handling different rendering scenarios, with a focus on post effects.

## Architecture

The system uses a factory pattern to choose the appropriate runtime based on the configuration:

- **Standard Runtime**: Used when no post effects are present
- **Post Effect Runtime**: Used when post effects are detected
- **Runtime Factory**: Automatically chooses the appropriate runtime

## Files

### Core Runtime Files

- `standard.ts` - Standard rendering runtime without post effects
- `postEffectRuntime.ts` - Basic post effect runtime (simplified version)
- `postEffectChainRuntime.ts` - Advanced post effect runtime with chaining support
- `runtimeFactory.ts` - Factory that chooses the appropriate runtime
- `postEffectChainUtils.ts` - Utility functions for chaining multiple post effects

### Configuration

- `index.ts` - Exports all runtime functions and types

## Usage

The system is automatically used by the `useThread` hook. When post effects are detected in the config, it automatically switches to the post effect runtime.

## Extending the System

### Adding New Post Effects

1. **Update the post effect detection**: Modify `findPostEffectTransforms` in `src/config/post-effects/findPostEffectTransforms.ts` to detect your new post effect type.

2. **Create a new runtime** (if needed): If your post effect requires special handling, create a new runtime file following the pattern of existing runtimes.

3. **Update the factory**: Add your new runtime to the `useRuntimeFactory` function in `runtimeFactory.ts`.

### Chaining Multiple Post Effects

The current system supports basic chaining of multiple post effects. To implement more sophisticated chaining:

1. **Modify `chainPostEffects`**: Update the function in `postEffectChainUtils.ts` to implement proper texture chaining.

2. **Create intermediate render targets**: Use `createRenderTargetChain` to set up proper texture passing between effects.

3. **Update the ping-pong system**: Modify `framePingPong.ts` to support multiple render targets.

### Example: Adding a New Post Effect Type

```typescript
// 1. Add detection logic in findPostEffectTransforms.ts
if (parameterConfig.key === "uMyNewEffect") {
  pingpongRenderTargets.push({
    materialId: materialConfig.guid,
    parameter: parameterConfig,
  });
}

// 2. Create a specialized runtime if needed
export const useMyNewEffectRuntime = (config: MyNewEffectConfig) => {
  // Implementation
};

// 3. Update the factory
if (postEffects.some((effect) => effect.type === "myNewEffect")) {
  return useMyNewEffectRuntime(config);
}
```

## Future Enhancements

- **Advanced chaining**: Implement proper texture passing between multiple post effects
- **Performance optimization**: Add support for render target pooling
- **Dynamic post effects**: Support for runtime addition/removal of post effects
- **Post effect presets**: Pre-configured post effect chains for common use cases
