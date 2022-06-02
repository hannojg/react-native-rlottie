/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import RLottieView from 'react-native-rlottie/src/index';

const lottieAnim = JSON.stringify(require('./assets/icon_trophy.json'));

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar/>
      <RLottieView src={lottieAnim} style={styles.animation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  animation: {
    height: 700,
    width: 700
  }
});

export default App;
