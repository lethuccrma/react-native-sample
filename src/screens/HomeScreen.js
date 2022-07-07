/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StatusBar,
} from 'react-native';
import { FAB, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import TokenCard from '../components/TokenCard';
import WalletSlice from '../redux/wallet/wallet.slice';
import AuthSlice from '../redux/auth/auth.slice';
import colors from '../constants/colors';
import { convertToCurrencyFormat } from '../utils/string';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  flatListContainer: {
    marginTop: 10,
  },
  contentFlatListContainer: {},
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
    alignItems: 'center',
    padding: 16,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
});

function ShowWalletInfo({ name, description, evaluation, updatedAt }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(AuthSlice.actions.logout());
  };
  const defaultAvatar = '../assets/default-avatar.png';
  return (
    <View style={styles.walletInfo}>
      <Avatar.Image size={77} source={require(defaultAvatar)} />
      <View style={styles.textContainer}>
        <Text style={{ color: 'white', fontSize: 20 }}>{`Name: ${name}`}</Text>
        <Text style={{ color: 'white', fontSize: 16, marginTop: 4 }}>
          {`Description: ${description}`}
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            marginTop: 12,
            fontWeight: 'bold',
          }}
        >
          {`Total evaluation: ${convertToCurrencyFormat(evaluation)}`}
        </Text>
        <Text style={{ color: 'white', fontSize: 13, marginTop: 3 }}>
          {`Last Updated: ${(updatedAt || moment()).format(
            'HH:mm:ss, MMMM Do YYYY',
          )}`}
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
        <Text>You do not have any token!</Text>
      </View>
    );
  }
  // console.log(tokens[0].positions);
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.wallet);
  return (
    <View flex={1}>
      <FlatList
        style={styles.flatListContainer}
        contentContainerStyle={styles.contentFlatListContainer}
        data={tokens}
        keyExtractor={(item) => item.id}
        refreshing={wallet.fetching}
        onRefresh={() => {
          dispatch(WalletSlice.actions.fetchWallet());
        }}
        renderItem={({ item }) => (
          <TokenCard
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

  const totalEvaluation = wallet.tokens
    .map(
      (token) => token.positions.reduce((pre, pos) => pre + pos.amount, 0)
        * token.pricePerUnit,
    )
    .reduce((pre, cur) => pre + cur, 0);

  return (
    <View style={{ flex: 1, backgroundColor: colors.mainColor }}>
      <StatusBar backgroundColor={colors.mainColor} barStyle="light-content" />
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
        <ShowWalletInfo
          name={wallet.name}
          description={wallet.description}
          evaluation={totalEvaluation}
          updatedAt={wallet.updatedAt}
        />
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
