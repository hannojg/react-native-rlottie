import {
  Animated,
  requireNativeComponent,
  ViewProps,
  Platform,
} from 'react-native';

// @ts-expect-error
const isFabricEnabled = global.nativeFabricUIManager != null;

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

const LINKING_ERROR =
  `The package 'react-native-rlottie' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

if (RLottieView == null) {
  throw new Error(LINKING_ERROR);
}

export default RLottieView;
