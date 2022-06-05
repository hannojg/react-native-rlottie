import React from 'react';
import {ScrollView} from 'react-native';
import {Item} from '../components/Item';
import type {NativeStackHeaderProps} from '@react-navigation/native-stack';

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
    </ScrollView>
  );
};
