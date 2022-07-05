import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import qs from 'qs';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
  symbol: {
    color: 'black',
    fontWeight: '500',
  },
  value: {
    marginTop: 5,
    color: '#777',
  },
});

function CoinCard({ code, value }) {
  return (
    <View style={styles.container}>
      <Avatar.Image
        size={50}
        source={{
          uri: `https://ui-avatars.com/api/?${qs.stringify({
            name: value,
            background: 'random',
          })}`,
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.symbol}>{code}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

export default CoinCard;
