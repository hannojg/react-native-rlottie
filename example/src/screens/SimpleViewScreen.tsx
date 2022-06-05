import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import RLottieView from 'react-native-rlottie';

const anim = require('../../assets/icon_trophy.json');

export const SimpleViewScreen = () => (
  <View style={styles.container}>
    <RLottieView source={anim} autoPlay style={styles.anim} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  anim: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
});
