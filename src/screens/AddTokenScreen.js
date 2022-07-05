import React from 'react';
import {
  SafeAreaView, StyleSheet, Text, FlatList,
} from 'react-native';
import CoinCard from '../components/CoinCard';
import symbols from '../constants/symbols';

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
  const renderCoinCard = ({ item }) => <CoinCard code={item.code} value={item.value} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatListContainer}
        contentContainerStyle={styles.contentFlatListContainer}
        data={symbols}
        keyExtractor={tokenKeyExtractor}
        renderItem={renderCoinCard}
      />
    </SafeAreaView>
  );
}

export default AddTokenScreen;
