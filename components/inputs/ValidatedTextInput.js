import React, { PureComponent } from 'react';
import { TextInput } from 'react-native';

class ValidatedTextInput extends PureComponent {
  handleValidation(value) {
    return value !== '';
  }
  onChange(value) {
    const { onChangeText, onValidation } = this.props;
    const isValid = this.handleValidation(value);

    onValidation && onValidation(isValid);
    onChangeText && onChangeText(value);
  }
  render() {
    const { onChangeText, children, style, ...props } = this.props;
    return (
      <TextInput
        style={style}
        onChangeText={value => this.onChange(value)}
        {...props}
      >
        {children}
      </TextInput>
    );
  }
}

export default ValidatedTextInput;
