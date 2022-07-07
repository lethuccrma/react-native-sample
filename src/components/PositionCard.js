import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  textContainer: {
    justifyContent: 'space-evenly',
  },
  deleteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  symbol: {
    color: 'black',
    fontWeight: '500',
    flex: 1,
  },
  value: {
    marginTop: 5,
    color: '#777',
  },
});

function PositionCard({ position, onDelete, pricePerUnit }) {
  const handleDeletePress = () => {
    onDelete(position);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View flex={1} style={{ flexDirection: 'row' }}>
          <Text style={styles.symbol}>
            {'Amt: '}
            <Text style={{ ...styles.symbol, color: '#00f' }}>
              {position.amount.toFixed(2)}
            </Text>
          </Text>
          <Text style={styles.symbol}>
            {'Evl: '}
            <Text style={{ ...styles.symbol, color: 'green' }}>
              {(position.amount * pricePerUnit).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </Text>
          </Text>
        </View>

        <Text style={styles.value}>
          {`Created time: ${moment(position.createdAt).format(
            'hh:mm:ss A, MMMM Do YYYY',
          )}`}
        </Text>
      </View>
      <View style={styles.deleteContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleDeletePress}>
          <Icon name="trash-outline" color="red" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PositionCard;
