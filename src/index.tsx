import * as React from 'react';
import {
  Animated,
  requireNativeComponent,
  ViewProps,
  Platform,
  StyleProp,
  ViewStyle,
  PixelRatio,
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
  /**
   * This is the size the animation is going to get decoded to bitmap with.
   * Setting this ensures the component renders as fast as possible, as we
   * internally don't have to wait for a measure.
   *
   * By default, if you set a numeric height/width in the styles of the view,
   * it will use these as values.
   *
   * You can also set this to a lower or higher value than the actual view's
   * size to increase or decrease quality of the animation.
   * (Lower size decodes faster and more effortlessly)
   */
  decodeWidth?: number;
  /**
   * Same as {@see decodeWidth} but for height.
   */
  decodeHeight?: number;
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

const getSizeFromStyles = (
  style: StyleProp<ViewStyle>,
  property: 'width' | 'height'
) => {
  if (
    typeof style === 'object' &&
    style != null &&
    property in style &&
    // @ts-expect-error typings for StyleProp<> are really hard
    typeof style[property] === 'number'
  ) {
    // @ts-expect-error typings for StyleProp<> are really hard
    return style[property];
  }
};

const maybeApplyPixelRatio = (x?: number) =>
  x != null ? PixelRatio.getPixelSizeForLayoutSize(x) : undefined;

export default class RLottieView extends React.PureComponent<RLottieViewProps> {
  static displayName = 'RLottieView';

  constructor(props: RLottieViewProps) {
    super(props);
  }

  render() {
    const {
      source,
      autoPlay = true,
      style,
      decodeWidth,
      decodeHeight,
      ...otherProps
    } = this.props;

    const sourceJson =
      typeof source === 'object' ? JSON.stringify(source) : source;

    const _decodeWidth = maybeApplyPixelRatio(
      decodeWidth ?? getSizeFromStyles(style, 'width')
    );
    const _decodeHeight = maybeApplyPixelRatio(
      decodeHeight ?? getSizeFromStyles(style, 'height')
    );
    console.log({ _decodeWidth, _decodeHeight });

    return (
      <NativeRLottieView
        style={style}
        src={sourceJson}
        isAutoPlay={autoPlay}
        decodeWidth={_decodeWidth}
        decodeHeight={_decodeHeight}
        {...otherProps}
      />
    );
  }
}
