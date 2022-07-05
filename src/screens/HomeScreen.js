import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  Text,
} from 'react-native';
import { FAB, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import qs from 'qs';
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
  walletInfo: {
    backgroundColor: '#f4511e',
    borderColor: '#f4511e',
    color: 'white',
    flexDirection: 'row',
    padding: 20,
  },
  textContainer: {
    marginLeft: 10,
  },
});

function ShowWalletInfo({ name, description }) {
  return (
    <View style={styles.walletInfo}>
      <Avatar.Image
        size={50}
        source={{
          uri: `https://ui-avatars.com/api/?${qs.stringify({
            name,
            background: 'random',
          })}`,
        }}
      />
      <View style={styles.textContainer}>
        <Text style={{ color: 'white', fontSize: 20 }}>
          Name:
          {' '}
          {name}
        </Text>
        <Text style={{ color: 'white', fontSize: 16, marginTop: 4 }}>
          Description:
          {' '}
          {description}
        </Text>
      </View>
    </View>
  );
}

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

        console.log(auth.token);
        console.log(`Wallet Info: ${response.data}`);
        console.log(response.data.wallet);
        console.log(response.data.wallet.tokens);
      })
      .catch((err) => {
        setError(err.response.data.message || err.message);

        console.log(err);
      });
  }, []);

  const renderCoinCard = ({ item }) => (
    <CoinCard code={item.symbol} value={item.name} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <Text>isLoading</Text>
        ) : (
          <View flex={1}>
            <ShowWalletInfo
              name={walletInfo.wallet.name}
              description={walletInfo.wallet.description}
            />
            <FlatList
              style={styles.flatListContainer}
              contentContainerStyle={styles.contentFlatListContainer}
              data={walletInfo.wallet.tokens}
              keyExtractor={(item) => item.id}
              renderItem={renderCoinCard}
            />
          </View>
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
