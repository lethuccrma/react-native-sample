import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import PrivateNavigator from './PrivateNavigator';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const auth = useSelector((state) => state.auth);
  return (
    <Stack.Navigator>
      {auth.authenticated ? (
        <Stack.Screen
          name="PRIVATE"
          component={PrivateNavigator}
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
