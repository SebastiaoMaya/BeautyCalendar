import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { lightBlue, white } from '../../utils/colors';

const SubmitButton = ({ children, onPress, style, disabled, btnStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn,
        btnStyle
      ]}
      disabled={disabled}
    >
      <Text style={[styles.submitBtnText, style]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: lightBlue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitBtn: {
    backgroundColor: lightBlue,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 16,
    textAlign: 'center'
  }
});

export default SubmitButton;
