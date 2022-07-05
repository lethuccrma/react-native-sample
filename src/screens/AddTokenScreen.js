import React, { useState } from 'react';
import {
  SafeAreaView, StyleSheet, FlatList, Alert,
} from 'react-native';
import { Dialog, Button, Paragraph } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import APIs from '../apis';
import CoinCard from '../components/CoinCard';
import server from '../configs/server';
import symbols from '../constants/symbols';
import WalletSlice from '../redux/wallet/wallet.slice';
import { generateURL } from '../utils/string';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatListContainer: {
    paddingHorizontal: 20,
  },
  contentFlatListContainer: {
    paddingTop: 10,
  },
});

const tokenKeyExtractor = ({ code }) => code;

function AddTokenScreen() {
  const [selectedToken, setToken] = useState(null);
  const [requesting, setRequesting] = useState(false);

  const dispatch = useDispatch();

  const handleSelectToken = (selected) => setToken(selected);
  const hideDialog = () => setToken(null);

  const renderCoinCard = ({ item }) => (
    <CoinCard onPress={handleSelectToken} code={item.code} value={item.value} />
  );

  const handleAddToken = async () => {
    setRequesting(true);
    try {
      await APIs.post(generateURL(server.ADD_TOKEN, { walletId: 1 }), {
        symbol: selectedToken.code,
        name: selectedToken.value,
      });

      // refetch wallet
      dispatch(WalletSlice.actions.fetchWallet());

      Alert.alert('Token was added successfully');
    } catch (err) {
      Alert.alert('Something went wrong :(');
      console.log(err);
    }
    hideDialog();
    setRequesting(false);
  };

  const genInfo = () => {
    if (requesting) {
      return 'Processing... Please wait!';
    }
    return selectedToken
      ? `Do you want to add token ${selectedToken.code}-${selectedToken.value}`
      : '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatListContainer}
        contentContainerStyle={styles.contentFlatListContainer}
        data={symbols}
        keyExtractor={tokenKeyExtractor}
        renderItem={renderCoinCard}
      />
      <Dialog visible={!!selectedToken} onDismiss={hideDialog}>
        <Dialog.Content>
          <Paragraph>{genInfo()}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button disabled={requesting} onPress={hideDialog}>Cancel</Button>
          <Button disabled={requesting} onPress={handleAddToken}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </SafeAreaView>
  );
}

export default AddTokenScreen;
