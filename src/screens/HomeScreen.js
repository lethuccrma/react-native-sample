import React from 'react';
import { SafeAreaView, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import AuthSlice from '../redux/auth/auth.slice';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
function HomeScreen() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(AuthSlice.actions.logout());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={handleLogout} title="Logout" />
    </SafeAreaView>
  );
}

export default HomeScreen;
