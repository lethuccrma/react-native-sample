/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import AddTokenScreen from '../screens/AddTokenScreen';
import colors from '../constants/colors';
import TokenScreen from '../screens/TokenScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HOME"
        component={HomeScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="ADD_TOKEN"
        component={AddTokenScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Button
              onPress={() => navigation.navigate('HOME')}
              title="Home"
              color={colors.lightBlue}
            />
          ),
          headerTitle: 'Add Token',
        })}
      />
      <Stack.Screen
        name="TOKEN_DETAIL"
        component={TokenScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Button
              onPress={() => navigation.navigate('HOME')}
              title="< Home"
              color={colors.lightBlue}
            />
          ),
          headerTitle: 'Token detail',
        })}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
