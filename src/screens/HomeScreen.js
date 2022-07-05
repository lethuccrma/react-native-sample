import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
function HomeScreen() {
  const navigator = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, borderColor: 'red' }}>
        <FAB
          icon="plus"
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
          }}
          onPress={() => {
            navigator.navigate('ADD_TOKEN');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
