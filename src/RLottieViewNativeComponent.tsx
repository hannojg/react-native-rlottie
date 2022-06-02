import type { HostComponent, ViewProps } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface NativeProps extends ViewProps {
    src: string;
	/**
	 * @default false
	 */
	isAutoPlay?: boolean;
	progress?: Float;
}

export default codegenNativeComponent<NativeProps>(
  'RLottieView'
) as HostComponent<NativeProps>;