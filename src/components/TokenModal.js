import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import symbols from '../constants/symbols';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  modalContainer: { justifyContent: 'flex-end', margin: 0 },
  safeContainer: { backgroundColor: '#fff' },
  buttonContainer: { justifyContent: 'center', flexDirection: 'row' },
  buttonCancel: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#999',
    borderRadius: 10,
    width: 90,
    alignItems: 'center',
  },
  buttonOk: {
    padding: 10,
    marginLeft: 10,
    backgroundColor: colors.lightBlue,
    borderRadius: 10,
    width: 90,
    alignItems: 'center',
  },
  text: { color: 'white', fontWeight: '700' },
});

function TokenModal({
  code, onClose, onSubmit, visible,
}) {
  const [token, setToken] = useState({
    code: '',
    value: '',
  });

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onSubmit(token);
    onClose();
  };

  useEffect(() => {
    let tokenFound = symbols.find((s) => s.code === code);
    if (!tokenFound) {
      [tokenFound] = symbols;
    }
    setToken(tokenFound);
  }, [code]);

  return (
    <Modal isVisible={!!visible} style={styles.modalContainer}>
      <SafeAreaView style={styles.safeContainer}>
        <Picker
          selectedValue={token.code}
          onValueChange={(itemValue, itemIndex) => setToken(symbols[itemIndex])}
        >
          {symbols.map((s) => (
            <Picker.Item
              key={s.code}
              label={`${s.code}-${s.value}`}
              value={s.code}
            />
          ))}
        </Picker>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleCancel}
            style={styles.buttonCancel}
          >
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleOk}
            style={styles.buttonOk}
          >
            <Text style={styles.text}>OK</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default TokenModal;
