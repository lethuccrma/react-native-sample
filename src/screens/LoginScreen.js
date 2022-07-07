import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
  StatusBar,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../constants/colors';
import AuthSlice from '../redux/auth/auth.slice';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  header: {
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.mainColor,
    letterSpacing: 1.5,
  },
  input: {
    marginTop: 15,
  },
  errorText: {
    color: 'red',
    marginTop: 15,
  },
  button: {
    backgroundColor: colors.mainColor,
    marginTop: 30,
    padding: 15,
    borderRadius: 25,
    width: '100%',
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
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View style={styles.container}>
          <Text style={styles.header}>CRYPTO WALLET</Text>
          <TextInput
            mode="outlined"
            label="Username"
            value={user.username}
            onChangeText={handleInputsChange('username')}
            style={[styles.input, { marginTop: 30 }]}
            activeOutlineColor={colors.secondaryColor}
            autoCapitalize={false}
          />
          <TextInput
            mode="outlined"
            label="Password"
            value={user.password}
            onChangeText={handleInputsChange('password')}
            style={styles.input}
            secureTextEntry
            activeOutlineColor={colors.secondaryColor}
            autoCapitalize={false}
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
