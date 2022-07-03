import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
function LaunchScreen() {
  return (
    <SafeAreaView style={styles.container} />
  );
}

export default LaunchScreen;
