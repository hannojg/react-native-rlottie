import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  Animated,
  Text,
} from 'react-native';
import RLottieView from 'react-native-rlottie';

const anim = require('../../assets/icon_trophy.json');
const AnimatedRLottieView = Animated.createAnimatedComponent(RLottieView);

export const ManualControlScreen = () => {
  const animation = useRef(new Animated.Value(0)).current;

  const onPressStart = () => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      useNativeDriver: true,
      duration: 2000,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.bold}>Note: This is android only currently 🤖🚫</Text>
      <AnimatedRLottieView
        source={anim}
        autoPlay={false}
        style={styles.anim}
        progress={animation}
      />
      <Button title="Progress animation manually" onPress={onPressStart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  anim: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
});
