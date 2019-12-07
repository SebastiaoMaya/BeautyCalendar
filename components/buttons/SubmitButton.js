/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gray, pink, white } from '../../utils/colors';

const SubmitButton = ({ children, onPress, style, disabled, btnStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        disabled ? styles.disabledIosSubmitBtn : styles.iosSubmitBtn,
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
    backgroundColor: pink,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  disabledIosSubmitBtn: {
    backgroundColor: gray,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
});

export default SubmitButton;
