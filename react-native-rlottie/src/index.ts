import { Animated, requireNativeComponent, ViewProps } from 'react-native';

export type RLottieViewProps = ViewProps & {
	src: string;
	/**
	 * @default false
	 */
	isAutoPlay?: boolean;
	progress?: number | Animated.Value | Animated.AnimatedInterpolation;
};

const RLottieView = requireNativeComponent<RLottieViewProps>('RLottieView');
export default RLottieView;