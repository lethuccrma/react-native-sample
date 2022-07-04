import React, { createContext, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

const AuthenticationContext = createContext({
  authentication: {
    authenticated: false,
    token: '',
  },
  setAuthentication: () => {},
});

function AppNavigator() {
  const [authentication, setAuthentication] = useState({
    authenticated: false,
    token: '',
  });
  return (
    // <NavigationContainer>
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthenticationContext.Provider value={{ authentication, setAuthentication }}>
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
    </AuthenticationContext.Provider>
  );
}

export default AppNavigator;
