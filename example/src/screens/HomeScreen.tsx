import React from 'react';
import {ScrollView} from 'react-native';
import {Item} from '../components/Item';
import type {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Platform} from 'react-native';

export const HomeScreen = ({navigation}: NativeStackHeaderProps) => {
  return (
    <ScrollView>
      <Item
        title="▶️ Simple auto play animation"
        onPress={() => navigation.navigate('SimpleViewScreen')}
      />
      <Item
        title="🫰 Manually control animation progress"
        onPress={() => navigation.navigate('ManualControlScreen')}
      />
      <Item
        title="📊 Performance test: RLottie"
        onPress={() => navigation.navigate('PerformanceRLottieScreen')}
      />
      <Item
        title={`📊 Performance test: Lottie (${Platform.select({
          ios: 'lottie-ios',
          android: 'lottie-android',
        })})`}
        onPress={() => navigation.navigate('PerformanceLottieScreen')}
      />
    </ScrollView>
  );
};
