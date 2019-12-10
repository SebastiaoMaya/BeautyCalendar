import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { gray, pink } from '../../utils/colors';
import * as Constants from '../../utils/constants';
import BeautySteppers from '../buttons/BeautySteppers';

const ChangeEntryRow = ({ item, decrement, increment, value }) => {
  return (
    <View key={item.key} style={styles.row}>
      <View style={styles.column}>
        <Text style={styles.activityDisplayName}>{item.displayName}</Text>
        <Text style={styles.activityDetails}>
          {Constants.PRICE_LABEL + item.price + Constants.EURO}
        </Text>
        <Text style={styles.activityDetails}>
          {Constants.PERCENTAGE_LABEL + item.percentage + Constants.PERCENTAGE}
        </Text>
      </View>
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
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: pink,
    padding: 20
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  activityDisplayName: {
    fontSize: 16,
    width: 150,
    paddingLeft: 20
  },
  activityDetails: {
    fontSize: 11,
    paddingLeft: 20,
    color: gray
  }
});

export default ChangeEntryRow;
