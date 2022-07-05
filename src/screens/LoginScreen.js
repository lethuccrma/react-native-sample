import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../constants/colors';
import AuthSlice from '../redux/auth/auth.slice';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderColor: '#fff',
    color: 'white',
  },
  header: {
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#777',
    marginTop: 15,
    padding: 5,
    fontSize: 14,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 15,
  },
  button: {
    backgroundColor: colors.mainColor,
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    width: 150,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    color: 'white',
  },
});

function LoginScreen() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const handleInputsChange = (key) => (text) => {
    setUser((pre) => ({ ...pre, [key]: text }));
  };

  const handleLoginButton = async () => {
    dispatch(
      AuthSlice.actions.startLogin({
        username: user.username,
        password: user.password,
      }),
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#fff',
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.header}>CRYPTO WALLET</Text>
          <TextInput
            placeholder="Username"
            autoCapitalize="none"
            style={[styles.input, { marginTop: 30 }]}
            onChangeText={handleInputsChange('username')}
            value={user.username}
          />
          <TextInput
            placeholder="Password"
            autoCapitalize="none"
            style={styles.input}
            secureTextEntry
            onChangeText={handleInputsChange('password')}
            value={user.password}
          />
          <Text style={styles.errorText}>{auth.loginError}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLoginButton}
            disabled={auth.loginPending}
          >
            {auth.loginPending ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.buttonText}>LOGIN</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default LoginScreen;
