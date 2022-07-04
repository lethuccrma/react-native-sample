import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
  SafeAreaView, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import Apis from '../apis';
import server from '../configs/server';
import AuthContext from '../contexts/AuthContext';

const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#777',
  },
  errorText: {
    color: 'red',
  },
  button: {
    backgroundColor: 'blue',
  },
  buttonText: {

  },
});

function LoginScreen() {
  const { authentication, setAuthentication } = useContext(AuthContext);
  const navigation = useNavigation();
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const handleInputsChange = (key) => (text) => {
    setInputs((pre) => ({ ...pre, [key]: text }));
  };

  const handleLoginButton = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const result = (await Apis.post(server.LOGIN_ENDPOINT, {
        username: inputs.username,
        password: inputs.password,
      })).data;
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
    <SafeAreaView>
      <Text>LoginScreen</Text>
      <TextInput style={styles.input} onChangeText={handleInputsChange('username')} value={inputs.username} />
      <TextInput style={styles.input} secureTextEntry onChangeText={handleInputsChange('password')} value={inputs.password} />
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLoginButton} disabled={isLoading}>
        {
          isLoading ? <ActivityIndicator size="small" /> : <Text style={styles.buttonText}>LOGIN</Text>
        }
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default LoginScreen;
