import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { lightBlue } from '../../utils/colors';

const TextButton = ({ children, onPress, style = {} }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: lightBlue
  }
});

export default TextButton;
