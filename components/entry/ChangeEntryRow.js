import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { pink } from '../../utils/colors';
import BeautySteppers from '../buttons/BeautySteppers';

const ChangeEntryRow = ({ item, decrement, increment, value }) => {
  return (
    <View key={item.key} style={styles.row}>
      <Text style={styles.entryTypeDisplayName}>{item.displayName}</Text>
      <BeautySteppers
        value={value}
        onIncrement={increment}
        onDecrement={decrement}
        {...item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: pink,
    padding: 20
  },
  entryTypeDisplayName: {
    fontSize: 16,
    width: 150,
    paddingLeft: 20
  }
});

export default ChangeEntryRow;
