import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const auth = useSelector((state) => state.auth);
  return (
    <Stack.Navigator>
      {auth.authenticated ? (
        <Stack.Screen
          name="HOME"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="LOGIN"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}

export default AppNavigator;
