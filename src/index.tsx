import * as React from 'react';
import {
  Animated,
  requireNativeComponent,
  ViewProps,
  Platform,
} from 'react-native';

// @ts-expect-error
const isFabricEnabled = global.nativeFabricUIManager != null;

export type RLottieViewProps = ViewProps & {
  source: string; // TODO: support "AnimationObject | { uri: string }" as well;
  /**
   * @default true
   */
  autoPlay?: boolean;
  progress?: number | Animated.Value | Animated.AnimatedInterpolation;
};

const NativeRLottieView = isFabricEnabled
  ? require('./RLottieViewNativeComponent').default
  : requireNativeComponent<RLottieViewProps>('RLottieView');

const LINKING_ERROR =
  `The package 'react-native-rlottie' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

if (NativeRLottieView == null) {
  throw new Error(LINKING_ERROR);
}

export default class RLottieView extends React.PureComponent<RLottieViewProps> {
  static displayName = 'RLottieView';

  constructor(props: RLottieViewProps) {
    super(props);
  }

  render() {
    const { source, autoPlay = true, ...otherProps } = this.props;

    const sourceJson =
      typeof source === 'object' ? JSON.stringify(source) : source;

    return (
      <NativeRLottieView
        src={sourceJson}
        isAutoPlay={autoPlay}
        {...otherProps}
      />
    );
  }
}
