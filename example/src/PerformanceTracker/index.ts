// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const PerformanceTracker = isTurboModuleEnabled
  ? require('./NativePerformanceTracker').default
  : require('./PerformanceTracker').default;

export default PerformanceTracker;
