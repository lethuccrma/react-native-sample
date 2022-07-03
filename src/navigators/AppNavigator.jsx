import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LaunchScreen from '../screens/LaunchScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="LAUNCH_SCREEN"
        component={LaunchScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
