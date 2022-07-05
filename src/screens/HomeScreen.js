import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useDispatch } from 'react-redux';
import AuthSlice from '../redux/auth/auth.slice';
import { FAB } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
function HomeScreen() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(AuthSlice.actions.logout());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, borderWidth: 1, borderColor: 'red' }}>
        <Button onPress={handleLogout} title="Logout" />
        {/* <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
            width: 70,
            height: 70,
            position: 'absolute',
            backgroundColor: 'red',
            borderRadius: 35,
            bottom: 20,
            right: 20,
          }}
          onPress={() => {
            console.log('Button is pressed');
          }}
        >
          <Text style={{ color: 'white', fontSize: 64 }}>+</Text>
        </TouchableOpacity> */}
        <FAB
          icon="plus"
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
          }}
          onPress={() => console.log('Pressed')}
        />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
