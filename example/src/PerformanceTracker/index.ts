import type { Spec } from "./NativePerformanceTracker";

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const PerformanceTracker: Spec = isTurboModuleEnabled
  ? require('./NativePerformanceTracker').default
  : require('./PerformanceTracker').default;

export default PerformanceTracker;
