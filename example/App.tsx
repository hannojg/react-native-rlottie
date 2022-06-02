import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';
import RLottieView from 'react-native-rlottie';

const lottieAnim = JSON.stringify(require('./assets/icon_trophy.json'));

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <Text>RLottie using new arch</Text>
      <RLottieView src={lottieAnim} isAutoPlay style={styles.animation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  animation: {
    height: 700,
    width: 700,
  },
});

export default App;
