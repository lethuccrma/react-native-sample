import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import { FAB, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import Icon from 'react-native-vector-icons/Ionicons';
import CoinCard from '../components/CoinCard';
import WalletSlice from '../redux/wallet/wallet.slice';
import AuthSlice from '../redux/auth/auth.slice';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
    backgroundColor: colors.mainColor,
    borderColor: colors.mainColor,
    color: 'white',
    flexDirection: 'row',
    padding: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
});

function ShowWalletInfo({ name, description }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(AuthSlice.actions.logout());
  };

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
      <TouchableOpacity
        onPress={handleLogout}
        style={{ justifyContent: 'center' }}
      >
        <Icon name="log-out-outline" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

function HomeScreen() {
  const navigator = useNavigation();
  const wallet = useSelector((state) => state.wallet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(WalletSlice.actions.fetchWallet());
  }, []);

  const renderCoinCard = ({ item }) => (
    <CoinCard onPress={() => {}} code={item.symbol} value={item.name} />
  );
  return (
    <View style={{ flex: 1, backgroundColor: colors.mainColor }}>
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
      <SafeAreaView style={styles.container}>
        <ShowWalletInfo name={wallet.name} description={wallet.description} />
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          }}
        >
          {wallet.fetching ? (
            <Text>Wallet is loading...</Text>
          ) : (
            <View flex={1}>
              <FlatList
                style={styles.flatListContainer}
                contentContainerStyle={styles.contentFlatListContainer}
                data={wallet.tokens}
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
    </View>
  );
}

export default HomeScreen;
