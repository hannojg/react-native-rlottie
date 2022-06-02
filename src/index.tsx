import { Animated, requireNativeComponent, ViewProps } from 'react-native';

// @ts-expect-error
const isFabricEnabled = global.nativeFabricUIManager != null;

// TODO: i think the types here can be removed?
export type RLottieViewProps = ViewProps & {
  src: string;
  /**
   * @default false
   */
  isAutoPlay?: boolean;
  progress?: number | Animated.Value | Animated.AnimatedInterpolation;
};

const RLottieView = isFabricEnabled
  ? require('./RLottieViewNativeComponent').default
  : requireNativeComponent<RLottieViewProps>('RLottieView');

export default RLottieView;
