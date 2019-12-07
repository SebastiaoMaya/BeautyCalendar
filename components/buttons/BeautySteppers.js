import { Entypo, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { gray, pink, white } from '../../utils/colors';

const BeautySteppers = ({
  max,
  unit,
  step,
  value,
  onIncrement,
  onDecrement
}) => {
  return (
    <View style={[styles.row, { justifyContent: 'space-between' }]}>
      {Platform.OS === 'ios' ? (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={onDecrement}
            style={[
              styles.iosBtn,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 }
            ]}
          >
            <Entypo name='minus' size={30} color={pink} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onIncrement}
            style={[
              styles.iosBtn,
              { borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }
            ]}
          >
            <Entypo name='plus' size={30} color={pink} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={onDecrement}
            style={[
              styles.androidBtn,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 }
            ]}
          >
            <FontAwesome name='minus' size={30} color={white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onIncrement}
            style={[
              styles.androidBtn,
              { borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }
            ]}
          >
            <FontAwesome name='plus' size={30} color={white} />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.metricCounter}>
        <Text style={{ fontSize: 24, textAlign: 'center' }}>{value}</Text>
        <Text style={{ fontSize: 18, color: gray }}>{unit}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  androidBtn: {
    margin: 5,
    backgroundColor: pink,
    padding: 10,
    borderRadius: 2
  },
  iosBtn: {
    backgroundColor: white,
    borderColor: pink,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default BeautySteppers;
