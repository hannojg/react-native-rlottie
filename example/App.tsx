import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './src/screens/HomeScreen';
import {SimpleViewScreen} from './src/screens/SimpleViewScreen';
import {ManualControlScreen} from './src/screens/ManualControlScreen';
import {PerformanceRLottieScreen} from './src/screens/PerformanceRLottieScreen';
import {PerformanceLottieScreen} from './src/screens/PerformanceLottieScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SimpleViewScreen" component={SimpleViewScreen} />
        <Stack.Screen
          name="ManualControlScreen"
          component={ManualControlScreen}
        />
        <Stack.Screen
          name="PerformanceRLottieScreen"
          component={PerformanceRLottieScreen}
        />
        <Stack.Screen
          name="PerformanceLottieScreen"
          component={PerformanceLottieScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
