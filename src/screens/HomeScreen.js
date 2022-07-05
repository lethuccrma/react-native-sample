import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  Text,
} from 'react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Apis from '../apis';
import server from '../configs/server';
import CoinCard from '../components/CoinCard';

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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

function HomeScreen() {
  const navigator = useNavigation();
  const auth = useSelector((state) => state.auth);

  const [walletInfo, setWalletInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setError(undefined);
    const config = {
      method: 'get',
      url: server.GET_WALLET,
      headers: {
        Authorization: `Bearer ${auth.token}`,
        Accept: 'application/json',
      },
    };
    Apis(config)
      .then((response) => {
        setWalletInfo(response.data);
        setIsLoading(false);

        console.log(`Wallet Info: ${response.data}`);
        console.log(response.data.wallet);
        console.log(response.data.wallet.tokens);
      })
      .catch((err) => {
        setError(err.response.data.message || err.message);

        console.log(err);
      });
  }, []);

  const tokenKeyExtractor = ({ code }) => code;
  const renderCoinCard = ({ item }) => (
    <CoinCard code={item.symbol} value={item.name} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <Text>isLoading</Text>
        ) : (
          <FlatList
            style={styles.flatListContainer}
            contentContainerStyle={styles.contentFlatListContainer}
            data={walletInfo.wallet.tokens}
            keyExtractor={tokenKeyExtractor}
            renderItem={renderCoinCard}
          />
        )}

        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => {
            navigator.navigate('ADD_TOKEN');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
