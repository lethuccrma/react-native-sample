import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import moment from 'moment';

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
//   console.log(position);
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.symbol}>
          {'Amount: '}
          <Text style={{ ...styles.symbol, color: 'green' }}>{position.amount.toFixed(2)}</Text>
        </Text>
        <Text style={styles.value}>
          {`Created time: ${moment(position.createdAt).format('h:mm:ss A, MMMM Do YYYY')}`}
        </Text>
      </View>
    </View>
  );
}

export default PositionCard;
