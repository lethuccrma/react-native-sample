import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView, Text, View, StyleSheet, FlatList,
} from 'react-native';
import { FAB } from 'react-native-paper';
import { useSelector } from 'react-redux';
import PositionCard from '../components/PositionCard';
import colors from '../constants/colors';

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
    margin: 10,
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
  const totalPosition = positions.length;
  let totalAmount = 0;
  positions.forEach((position) => {
    totalAmount += position.amount;
  });
  return { totalPosition, totalAmount };
}

function ShowTokenInfo({ token }) {
  const { totalPosition, totalAmount } = CalculateOverviewTransaction(
    token.positions,
  );
  return (
    <View style={{ ...styles.tokenInfoContainer }}>
      <View style={{ flex: 1, justifyContent: 'space-evenly', marginLeft: 32 }}>
        <Text style={{ color: 'white' }}>
          {'Code : '}
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{token.symbol}</Text>
        </Text>
        <Text style={{ color: 'white' }}>
          {'Name: '}
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{token.name}</Text>
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
        <Text style={{ color: 'white' }}>
          {'Position : '}
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{totalPosition}</Text>
        </Text>
        <Text style={{ color: 'white' }}>
          {'Amount : '}
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{totalAmount.toFixed(2)}</Text>
        </Text>
      </View>
    </View>
  );
}

export default function TokenScreen({ route }) {
  const wallet = useSelector((state) => state.wallet);
  const { token: { symbol } } = route.params;
  const token = wallet.tokens.find((t) => t.symbol === symbol);
  const navigator = useNavigation();
  // console.log(token);
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
              renderItem={({ item }) => (
                <PositionCard onPress={() => {}} position={item} />
              )}
              inverted
            />
          ) : (
            <View flex={1} justifyContent="center" alignItems="center">
              <Text>I do not have any position!</Text>
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
    </SafeAreaView>
  );
}