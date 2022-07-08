import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import moment from 'moment';
import { convertToAmountFormat, convertToCurrencyFormat } from '../utils/string';

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
          <View style={[styles.symbol, { flexDirection: 'row', alignItems: 'center' }]}>
            <MIcon name="database-outline" size={18} color="#000" />
            <Text style={{ ...styles.symbol, color: '#00f', margin: 4 }}>
              {convertToAmountFormat(position.amount)}
            </Text>
          </View>
          <View style={[styles.symbol, { flexDirection: 'row', alignItems: 'center' }]}>
            <MIcon name="cash" size={25} color="#000" />
            <Text style={{ ...styles.symbol, color: 'green', margin: 4 }}>
              {convertToCurrencyFormat(position.amount * pricePerUnit)}
            </Text>
          </View>
        </View>

        <Text style={styles.value}>
          {`Created time: ${moment(position.createdAt).format(
            'HH:mm:ss, MMMM Do YYYY',
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
