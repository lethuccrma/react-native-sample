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
import { useNavigation } from '@react-navigation/native';
import colors from '../constants/colors';
import WalletSlice from '../redux/wallet/wallet.slice';
import APIs from '../apis';
import { generateURL } from '../utils/string';
import server from '../configs/server';

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
    margin: 16,
    backgroundColor: colors.mainColor,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
});

export default function AddPositionScreen({ route }) {
  console.log(route.params);
  const wallet = useSelector((state) => state.wallet);
  const tokenSymbol = route.params.token.symbol;
  const tokenName = route.params.token.name;
  const navigator = useNavigation();

  const [amount, setAmount] = useState(0);
  const [requesting, setRequesting] = useState(false);
  const dispatch = useDispatch();

  const handlePositionToken = async () => {
    setRequesting(true);
    try {
      await APIs.post(generateURL(server.ADD_POSITION, { walletId: wallet.ID, tokenSymbol }), {
        amount: parseFloat(amount),
      });

      // refetch wallet
      dispatch(WalletSlice.actions.fetchWallet());

      Alert.alert('Token was added successfully!');
      navigator.goBack();
    } catch (err) {
      Alert.alert('Something went wrong!');
      console.log(err);
      console.log(generateURL(server.ADD_POSITION, { walletId: wallet.ID, tokenSymbol }));
      console.log(amount);
      console.log(err.message);
    }
    setRequesting(false);
  };

  return (
    <SafeAreaView flex={1}>
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          label="Token symbol"
          value={tokenSymbol}
          disabled
          editable={false}
          style={styles.inputContainer}
          activeOutlineColor={colors.secondaryColor}
          right={(
            <TextInput.Icon
              // eslint-disable-next-line react/no-unstable-nested-components
              name={() => (
                <Icon
                  name="caret-down-circle-outline"
                  size={24}
                />
              )}
              disabled
            />
          )}
        />
        <TextInput
          mode="outlined"
          label="Token name"
          value={tokenName}
          disabled
          editable={false}
          style={styles.inputContainer}
          activeOutlineColor={colors.secondaryColor}
        />
        <TextInput
          mode="outlined"
          label="Amount"
          value={amount}
          onChangeText={(value) => setAmount(value)}
          style={styles.inputContainer}
          activeOutlineColor={colors.secondaryColor}
          keyboardType="numeric"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => handlePositionToken()}
            style={styles.button}
            disabled={requesting}
          >
            {requesting
              ? <ActivityIndicator size="small" />
              : <Text style={styles.buttonText}>Add Position</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
