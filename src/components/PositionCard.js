import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  textContainer: {},
  deleteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
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

function PositionCard({ position, onDelete }) {
  const handleDeletePress = () => {
    onDelete(position);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.symbol}>
          {'Amount: '}
          <Text style={{ ...styles.symbol, color: 'green' }}>
            {position.amount.toFixed(2)}
          </Text>
        </Text>
        <Text style={styles.value}>
          {`Created time: ${moment(position.createdAt).format(
            'h:mm:ss A, MMMM Do YYYY',
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
