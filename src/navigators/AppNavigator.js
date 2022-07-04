import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import AuthContext from '../contexts/AuthContext';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const [authentication, setAuthentication] = useState({
    authenticated: false,
    token: '',
    expire: '',
  });
  return (
    // <NavigationContainer>
    <AuthContext.Provider value={{ authentication, setAuthentication }}>
      <Stack.Navigator>
        {authentication.authenticated && (
        <Stack.Screen
          name="HOME"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        )}
        <Stack.Screen
          name="LOGIN"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}

export default AppNavigator;
