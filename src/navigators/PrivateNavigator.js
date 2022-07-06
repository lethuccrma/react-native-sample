/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import AddTokenScreen from '../screens/AddTokenScreen';
import colors from '../constants/colors';
import TokenScreen from '../screens/TokenScreen';
import AddPositionScreen from '../screens/AddPositionScreen';

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
              onPress={() => navigation.goBack()}
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
              onPress={() => navigation.goBack()}
              title="<"
              color="white"
            />
          ),
          headerTitle: 'Token Detail',
          headerTintColor: 'white',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.mainColor,
          },
        })}
      />
      <Stack.Screen
        name="ADD_POSITION"
        component={AddPositionScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Button
              onPress={() => navigation.goBack()}
              title="<"
              color={colors.lightBlue}
            />
          ),
          headerTitle: 'Add position',
        })}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
