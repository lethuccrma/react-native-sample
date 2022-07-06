import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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

function PositionCard({ position }) {
  console.log(position);
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.symbol}>{position.amount}</Text>
        <Text style={styles.value}>{position.createdAt}</Text>
      </View>
    </View>
  );
}

export default PositionCard;
