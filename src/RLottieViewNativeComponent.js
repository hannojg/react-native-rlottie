// @ts-nocheck
/**
 * @flow strict-local
 */

import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';
import type { Float } from 'react-native/Libraries/Types/CodegenTypes';

type NativeProps = $ReadOnly<{|
  ...ViewProps,
  src: string,
  /**
   * @default false
   */
  isAutoPlay?: boolean,
  progress?: Float,
  decodeWidth?: Float,
  decodeHeight?: Float,
|}>;

export default (codegenNativeComponent<NativeProps>(
  'RLottieView'
): HostComponent<NativeProps>);
