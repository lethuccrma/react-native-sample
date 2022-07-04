import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
});

function LoginScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Text>LoginScreen</Text>
    </SafeAreaView>
  );
}

export default LoginScreen;
