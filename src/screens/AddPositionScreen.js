import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

export default function AddPositionScreen({ route }) {
  console.log(route.params);
  return (
    <SafeAreaView>
      <Text>Test</Text>
    </SafeAreaView>
  );
}
