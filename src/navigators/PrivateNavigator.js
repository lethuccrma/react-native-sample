/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import { useDispatch } from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
import AddTokenScreen from '../screens/AddTokenScreen';
import colors from '../constants/colors';
import AuthSlice from '../redux/auth/auth.slice';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ADD_TOKEN"
        component={AddTokenScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Button
              onPress={() => navigation.navigate('HOME')}
              title="<"
              color={colors.lightBlue}
            />
          ),
          headerTitle: 'Add Token',
        })}
      />
      <Stack.Screen
        name="HOME"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Button
              onPress={() => {
                dispatch(AuthSlice.actions.logout());
              }}
              title="Log out"
              color="white"
            />
          ),
          headerTitle: 'Home',
          headerStyle: {
            backgroundColor: '#f4511e',
            borderBottomWidth: 0,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
