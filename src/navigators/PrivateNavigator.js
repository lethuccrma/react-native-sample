/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
            <Icon.Button
              name="arrow-back-ios"
              color="black"
              backgroundColor="white"
              onPress={() => navigation.goBack()}
            />
          ),
          headerTitle: 'Add Token',
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="TOKEN_DETAIL"
        component={TokenScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon.Button
              name="arrow-back-ios"
              color="white"
              backgroundColor={colors.mainColor}
              onPress={() => navigation.goBack()}
            />
          ),
          headerTitle: 'Token Detail',
          headerTitleAlign: 'center',
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
            <Icon.Button
              name="arrow-back-ios"
              color="black"
              backgroundColor="white"
              onPress={() => navigation.goBack()}
            />
          ),
          headerTitle: 'Add position',
          headerTitleAlign: 'center',
        })}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
