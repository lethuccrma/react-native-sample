import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView, Text, View, StyleSheet, FlatList,
} from 'react-native';
import PositionCard from '../components/PositionCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: 'red',
    borderWidth: 1,
  },
  flatListContainer: {
    flex: 1,
    paddingHorizontal: 20,
    borderColor: 'red',
    borderWidth: 1,
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
    borderColor: 'red',
    borderWidth: 1,
  },
});

function CalculateOverviewTransaction(positions) {
  console.log(positions);
  const totalPosition = positions.length;
  let totalAmount = 0;
  positions.forEach((position) => {
    totalAmount += position.amount;
  });
  return { totalPosition, totalAmount };
}

function ShowTokenInfo({ token }) {
  const { totalPosition, totalAmount } = CalculateOverviewTransaction(token.positions);
  return (
    <View style={styles.tokenInfoContainer}>
      <View style={{ flex: 1 }}>
        <Text>{token.symbol}</Text>
        <Text>{token.name}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text>
          totalPosition :
          {' '}
          {totalPosition}
        </Text>
        <Text>
          totalAmount :
          {' '}
          {totalAmount}
        </Text>
      </View>
    </View>
  );
}

export default function TokenScreen({ route }) {
  const { token } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ShowTokenInfo token={token} />
        <FlatList
          style={styles.flatListContainer}
          contentContainerStyle={styles.contentFlatListContainer}
          data={token.positions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PositionCard
              onPress={() => {}}
              position={item}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
