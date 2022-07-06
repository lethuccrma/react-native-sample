import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';

export default function TokenScreen({ route }) {
  const { token } = route.params;
  return (
    <SafeAreaView>
      <Text>{token.name}</Text>
    </SafeAreaView>
  );
}
