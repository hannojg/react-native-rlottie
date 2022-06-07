import React from 'react';
import {useState} from 'react';
import {View, Button, StyleSheet, Dimensions} from 'react-native';
import PerformanceStats, {
  PerformanceStatsData,
} from 'react-native-performance-stats';

const anim = require('../../assets/icon_trophy.json');

type Props = {
  LottieComponent: React.ComponentType<{
    style?: any;
    source: any;
    autoPlay?: boolean;
  }>;
};

export const PerformanceScreen: React.FC<Props> = ({LottieComponent}) => {
  const [showAnim, setShowAnim] = useState(false);

  const onPressStart = () => {
    let phase = 'BASE';
    const perfData: (PerformanceStatsData & {phase: string})[] = [];
    PerformanceStats.addListener(data => {
      perfData.push({
        phase,
        // @ts-expect-error doesn't know performance
        time: performance.now(),
        ...data,
      });
    });

    PerformanceStats.start(true);

    setTimeout(() => {
      phase = 'animation_running';
      setShowAnim(true);
      setTimeout(() => {
        PerformanceStats.stop();
        setShowAnim(false);
        console.log(perfData);
      }, 10000);
    }, 5000);
  };

  return (
    <View style={styles.container}>
      <Button title="Start test" onPress={onPressStart} />
      {showAnim && (
        <LottieComponent source={anim} autoPlay style={styles.anim} />
      )}
    </View>
  );
};

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
