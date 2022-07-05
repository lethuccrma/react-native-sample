import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  TextInput,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import APIs from '../apis';
import server from '../configs/server';
import WalletSlice from '../redux/wallet/wallet.slice';
import { generateURL } from '../utils/string';
import TokenModal from '../components/TokenModal';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginTop: 20,
  },
  buttonContainer: { marginTop: 20, alignItems: 'center' },
  button: {
    paddingVertical: 15,
    marginLeft: 10,
    backgroundColor: colors.mainColor,
    borderRadius: 10,
    alignItems: 'center',
    width: 150,
  },
  buttonText: { color: 'white', fontWeight: '700' },
});

function AddTokenScreen() {
  const [token, setToken] = useState({
    code: '',
    value: '',
  });
  const [symbolModalVisible, setSymbolModalVisible] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const wallet = useSelector((state) => state.wallet);

  const dispatch = useDispatch();

  const handleAddToken = async () => {
    setRequesting(true);
    try {
      await APIs.post(generateURL(server.ADD_TOKEN, { walletId: wallet.ID }), {
        symbol: token.code,
        name: token.value,
      });

      // refetch wallet
      dispatch(WalletSlice.actions.fetchWallet());

      Alert.alert('Token was added successfully');
    } catch (err) {
      Alert.alert('Something went wrong :(');
      console.log(err);
    }
    setRequesting(false);
  };

  const handleSubmitToken = (submittedToken) => {
    setToken(submittedToken);
  };

  const handleTokenInputChange = (key) => (value) => {
    setToken((pre) => ({ ...pre, [key]: value }));
  };

  const closeSymbolModal = () => {
    setSymbolModalVisible(false);
  };

  const openSymbolModal = () => {
    setSymbolModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          label="Token Symbol"
          autoCapitalize="characters"
          value={token.code}
          right={(
            <TextInput.Icon
              // eslint-disable-next-line react/no-unstable-nested-components
              name={() => (
                <Icon
                  onPress={openSymbolModal}
                  name="caret-down-circle-outline"
                  size={24}
                />
              )}
            />
          )}
          style={styles.inputContainer}
          onChangeText={handleTokenInputChange('code')}
          activeOutlineColor={colors.secondaryColor}
        />
        <TextInput
          mode="outlined"
          label="Token Name"
          value={token.value}
          onChangeText={handleTokenInputChange('value')}
          style={styles.inputContainer}
          activeOutlineColor={colors.secondaryColor}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleAddToken}
            style={styles.button}
            disabled={requesting}
          >
            {requesting
              ? <ActivityIndicator size="small" />
              : <Text style={styles.buttonText}>Add Token</Text>}
          </TouchableOpacity>
        </View>
        <TokenModal
          code={token.code}
          visible={symbolModalVisible}
          onClose={closeSymbolModal}
          onSubmit={handleSubmitToken}
        />
      </View>
    </SafeAreaView>
  );
}

export default AddTokenScreen;
