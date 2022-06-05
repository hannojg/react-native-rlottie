import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  start(): void;
  stop(): void;
}

export default TurboModuleRegistry.get<Spec>('PerformanceTracker');
