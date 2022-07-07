import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Avatar } from 'react-native-paper';
import qs from 'qs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import SwipeRowHold from './SwipeRowHold';
import colors from '../constants/colors';
import APIs from '../apis';
import { generateURL } from '../utils/string';
import server from '../configs/server';
import WalletSlice from '../redux/wallet/wallet.slice';
import tokenIcons from '../assets/token-icons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: 'space-evenly',
  },
  symbol: {
    color: 'black',
    fontWeight: '500',
  },
  value: {
    color: '#777',
  },
  amountContainer: {
    width: 120,
    justifyContent: 'space-evenly',
    overflow: 'hidden',
  },
  infoContainer: {
    flexDirection: 'row',
  },
  title: {
    color: 'black',
    fontWeight: '500',
  },
  menuButton: {
    height: '100%',
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
    margin: 5,
  },
});

function TokenCard({ onPress, token }) {
  const { symbol: code, name: value, positions, id } = token;
  const navigator = useNavigation();
  const wallet = useSelector((state) => state.wallet);
  const [requesting, setRequesting] = useState(false);
  const dispatch = useDispatch();

  const handlePress = () => {
    onPress({ code, value });
  };

  const handleAddPos = () => {
    navigator.navigate('ADD_POSITION', { token });
  };

  const handleDelete = async () => {
    setRequesting(true);
    try {
      await APIs.post(
        generateURL(server.DELETE_TOKEN, { walletId: wallet.ID }),
        {
          id,
        },
      );

      // refetch wallet
      dispatch(WalletSlice.actions.fetchWallet());

      Alert.alert('Delete token successfully!');
    } catch (err) {
      Alert.alert('Something went wrong!');
      console.log(err);
    }
    setRequesting(false);
  };

  const totalPosition = (token.positions || []).reduce(
    (pre, pos) => pre + pos.amount,
    0,
  );
  const totalEvaluation = token.pricePerUnit * totalPosition;

  return (
    <View>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.menuButton, { backgroundColor: colors.mainColor }]}
          onPress={handleDelete}
        >
          <Icon name="trash-outline" color="#fff" size={24} />
          <Text style={styles.menuButtonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.menuButton,
            { backgroundColor: colors.secondaryColor },
          ]}
          onPress={handleAddPos}
        >
          <Icon name="add-circle-outline" color="#fff" size={24} />
          <Text style={styles.menuButtonText}>Add Pos</Text>
        </TouchableOpacity>
      </View>
      <SwipeRowHold swipeThreshold={-150}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={handlePress}
          style={styles.container}
        >
          <Avatar.Image size={50} source={tokenIcons[token.symbol]} />
          <View style={styles.textContainer}>
            <Text style={styles.symbol}>{code}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
          <View style={{ flex: 1 }} />
          <View style={styles.amountContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Amt: </Text>
              <Text style={[styles.value, { color: colors.blue, fontWeight: '500' }]}>
                {totalPosition.toFixed(2)}
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Evl: </Text>
              <Text style={[styles.value, { color: colors.darkGreen, fontWeight: '500' }]}>
                {parseFloat(totalEvaluation.toFixed(2)).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </SwipeRowHold>
    </View>
  );
}

export default TokenCard;