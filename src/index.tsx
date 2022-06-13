import * as React from 'react';
import {
  Animated,
  requireNativeComponent,
  ViewProps,
  Platform,
  StyleProp,
  ViewStyle,
  PixelRatio,
  StyleSheet,
  View,
} from 'react-native';

// @ts-expect-error
const isFabricEnabled = global.nativeFabricUIManager != null;

export type RLottieViewProps = ViewProps & {
  source: string; // TODO: support "AnimationObject | { uri: string }" as well;
  /**
   * @default true
   */
  autoPlay?: boolean;
  autoSize?: boolean;
  loop?: boolean;
  resizeMode?: 'contain' | 'cover' | 'center';
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
      loop = false,
      autoPlay = true,
      autoSize = false,
      resizeMode = 'contain',
      style,
      decodeWidth,
      decodeHeight,
      ...otherProps
    } = this.props;

    const sourceJson =
      typeof source === 'object' ? JSON.stringify(source) : source;

    const aspectRatioStyle =
      typeof source === 'object'
        ? // @ts-expect-error Can't type the incoming JSON
          { aspectRatio: source.w / source.h }
        : undefined;
    const styleObject = StyleSheet.flatten(style);
    let sizeStyle;
    if (
      !styleObject ||
      (styleObject.width === undefined && styleObject.height === undefined)
    ) {
      sizeStyle =
        // @ts-expect-error Can't type the incoming JSON
        autoSize && sourceJson ? { width: source.w } : StyleSheet.absoluteFill;
    }

    const _decodeWidth = maybeApplyPixelRatio(
      decodeWidth ?? getSizeFromStyles(style, 'width')
    );
    const _decodeHeight = maybeApplyPixelRatio(
      decodeHeight ?? getSizeFromStyles(style, 'height')
    );

    return (
      <View style={[aspectRatioStyle, sizeStyle, style]}>
        <NativeRLottieView
          loop={loop}
          src={sourceJson}
          isAutoPlay={autoPlay}
          resizeMode={resizeMode}
          decodeWidth={_decodeWidth}
          decodeHeight={_decodeHeight}
          style={[
            aspectRatioStyle,
            sizeStyle ?? { width: '100%', height: '100%' },
            style,
          ]}
          {...otherProps}
        />
      </View>
    );
  }
}
