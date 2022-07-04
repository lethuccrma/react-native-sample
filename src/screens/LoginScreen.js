import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import Apis from '../apis';
import server from '../configs/server';
import AuthContext from '../contexts/AuthContext';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
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
    backgroundColor: '#327de6',
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
  const { setAuthentication } = useContext(AuthContext);
  const navigation = useNavigation();
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputsChange = (key) => (text) => {
    setInputs((pre) => ({ ...pre, [key]: text }));
  };

  const handleLoginButton = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const result = (
        await Apis.post(server.LOGIN_ENDPOINT, {
          username: inputs.username,
          password: inputs.password,
        })
      ).data;
      setAuthentication({
        authenticated: true,
        expire: result.expire,
        token: result.token,
      });
      navigation.navigate('HOME');
    } catch (err) {
      setError(err.response.data.message || err.message);
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>CRYPTO WALLET</Text>
        <TextInput
          placeholder="Username"
          autoCapitalize="none"
          style={[styles.input, { marginTop: 30 }]}
          onChangeText={handleInputsChange('username')}
          value={inputs.username}
        />
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          style={styles.input}
          secureTextEntry
          onChangeText={handleInputsChange('password')}
          value={inputs.password}
        />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLoginButton}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>LOGIN</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
