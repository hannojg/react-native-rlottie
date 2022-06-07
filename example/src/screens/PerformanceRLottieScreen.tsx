import React from 'react';
import { useState } from 'react';
import { Button } from 'react-native';
import {View, StyleSheet, Dimensions} from 'react-native';
import RLottieView from 'react-native-rlottie';
import PerformanceStats from "react-native-performance-stats";

const anim = require('../../assets/icon_trophy.json');

export const PerformanceRLottieScreen = () => {
    const [showAnim, setShowAnim] = useState(false);

    const onPressStart = () => {
        PerformanceStats.addListener((data) => {
            // data.;
        })

        setTimeout(() => {
            setShowAnim(true);
        }, 3000);
    }

    return (
        <View style={styles.container}>
            <Button title="Start test" onPress={onPressStart} />
            {showAnim && <RLottieView source={anim} autoPlay style={styles.anim} />}
        </View>
    );
}

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
