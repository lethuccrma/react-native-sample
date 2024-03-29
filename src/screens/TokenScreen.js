import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { Button, Dialog, FAB, Paragraph, Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import APIs from '../apis';
import PositionCard from '../components/PositionCard';
import server from '../configs/server';
import colors from '../constants/colors';
import WalletSlice from '../redux/wallet/wallet.slice';
import { convertToAmountFormat, convertToCurrencyFormat, generateURL } from '../utils/string';
import tokenIcons from '../assets/token-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  flatListContainer: {
    flex: 1,
    paddingHorizontal: 20,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  contentFlatListContainer: {
    paddingTop: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  tokenInfoContainer: {
    flex: 1,
    maxHeight: '10%',
    marginLeft: 16,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    // borderColor: 'blue',
    // borderWidth: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

function CalculateOverviewTransaction(positions) {
  // console.log(positions);
  let totalAmount = 0;
  positions.forEach((position) => {
    totalAmount += position.amount;
  });
  return { totalAmount };
}

function ShowTokenInfo({ token }) {
  const { totalAmount } = CalculateOverviewTransaction(
    token.positions,
  );
  const totalEvaluation = totalAmount * token.pricePerUnit;
  return (
    <View style={{ ...styles.tokenInfoContainer }}>
      <View style={{
        justifyContent: 'center' }}
      >
        <Avatar.Image
          size={50}
          source={
              tokenIcons[token.symbol]
            }
        />
      </View>

      <View style={{
        maxWidth: '40%',
        justifyContent: 'space-evenly',
        marginHorizontal: 10 }}
      >
        <Text style={{ color: 'white' }}>
          {'Code : '}
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {token.symbol}
          </Text>
        </Text>
        <Text style={{ color: 'white' }}>
          {'Name: '}
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {token.name}
          </Text>
        </Text>
      </View>
      <View style={{ flex: 1,
        justifyContent: 'space-evenly' }}
      >
        <Text style={{ color: 'white' }}>
          {'Amount     : '}
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {convertToAmountFormat(totalAmount)}
          </Text>
        </Text>
        <Text style={{ color: 'white' }}>
          {'Evaluation : '}
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {convertToCurrencyFormat(totalEvaluation)}
          </Text>
        </Text>

      </View>
    </View>
  );
}

export default function TokenScreen({ route }) {
  const wallet = useSelector((state) => state.wallet);
  const {
    token: { symbol },
  } = route.params;
  const token = wallet.tokens.find((t) => t.symbol === symbol) || {
    positions: [
      {
        id: 0,
        amount: 0,
        description: '',
        createdAt: '1970-01-01T00:00:00.000Z',
      },
    ],
  };
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const [selectedDelPos, setSelectedDelPos] = useState(null);
  const [requesting, setRequesting] = useState(false);

  const hideConfirmDelPosDialog = () => {
    setSelectedDelPos(null);
  };

  const showConfirmDelPosDialog = (pos) => {
    setSelectedDelPos(pos);
  };

  const handleDeletePosition = async () => {
    setRequesting(true);
    try {
      await APIs.post(
        generateURL(server.DELETE_POSITION, {
          walletId: wallet.ID,
          tokenSymbol: symbol,
        }),
        {
          id: selectedDelPos.id,
        },
      );
      dispatch(WalletSlice.actions.fetchWallet());
    } catch (err) {
      console.log(err);
      Alert.alert('Sorry! Something went wrong :(');
    }
    hideConfirmDelPosDialog();
    setRequesting(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ ...styles.container, backgroundColor: colors.mainColor }}>
        <ShowTokenInfo token={token} />
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          }}
        >
          {token.positions.length > 0 ? (
            <FlatList
              style={styles.flatListContainer}
              contentContainerStyle={styles.contentFlatListContainer}
              data={token.positions}
              keyExtractor={(item) => item.id}
              refreshing={wallet.fetching}
              onRefresh={() => { dispatch(WalletSlice.actions.fetchWallet()); }}
              renderItem={({ item }) => (
                <PositionCard
                  onDelete={showConfirmDelPosDialog}
                  position={item}
                  pricePerUnit={token.pricePerUnit}
                />
              )}
            />
          ) : (
            <View flex={1} justifyContent="center" alignItems="center">
              <Text>You do not have any position!</Text>
            </View>
          )}
        </View>

        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => {
            navigator.navigate('ADD_POSITION', { token });
            // console.log('Add position');
          }}
        />
      </View>
      <Dialog visible={!!selectedDelPos} onDismiss={hideConfirmDelPosDialog}>
        <Dialog.Title>Confirm delete position</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Do you want to delete this position?</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            loading={requesting}
            onPress={handleDeletePosition}
            color={colors.mainColor}
          >
            Delete
          </Button>
          <Button onPress={hideConfirmDelPosDialog} color="#777">
            Cancel
          </Button>
        </Dialog.Actions>
      </Dialog>
    </SafeAreaView>
  );
}
