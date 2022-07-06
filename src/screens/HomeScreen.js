import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
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
    marginTop: 10,
  },
  contentFlatListContainer: {
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

function ShowWalletTokens({ fetching, fetchError, tokens }) {
  if (fetching) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (fetchError.length > 0) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Text>Something was wrong!</Text>
        <Text>
          Error:
          {fetchError}
        </Text>
      </View>
    );
  }
  if (!tokens || tokens.length === 0) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Text>I do not have any token!</Text>
      </View>
    );
  }
  // console.log(tokens[0].positions);
  const navigator = useNavigation();
  return (
    <View flex={1}>
      <FlatList
        style={styles.flatListContainer}
        contentContainerStyle={styles.contentFlatListContainer}
        data={tokens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CoinCard
            onPress={() => {
              navigator.navigate('TOKEN_DETAIL', { token: item });
            }}
            token={item}
          />
        )}
      />
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
            paddingTop: 20,
          }}
        >
          <ShowWalletTokens
            fetching={wallet.fetching}
            fetchError={wallet.fetchError}
            tokens={wallet.tokens}
          />

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
