/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { addEntryType } from '../../actions/entryTypes';
import { pink } from '../../utils/colors';
import { submitEntryType } from '../../utils/entryTypes_api';
import SubmitButton from '../buttons/SubmitButton';
import NumericInput from '../inputs/NumericInput';

class AddEntryType extends Component {
  state = {
    nameInput: '',
    priceInput: '',
    percentageInput: '',
    validPrice: false,
    validPercentage: false,
    validActivityData: false
  };

  toHome = () => {
    this.props.navigation.dispatch(
      NavigationActions.back({
        key: 'AddEntryType'
      })
    );
  };

  submit = () => {
    const { dispatch, entryTypes } = this.props;

    const { nameInput, priceInput, percentageInput } = this.state;

    //Update Redux
    const entryTypeId = getEntryTypeIdFromName(nameInput);
    const entryTypeToAdd = {
      displayName: nameInput,
      price: priceInput,
      percentage: percentageInput,
      type: 'steppers',
      step: 1,
      max: 50
    };
    dispatch(
      addEntryType({
        [entryTypeId]: entryTypeToAdd
      })
    );

    this.setState({
      nameInput: '',
      priceInput: '',
      percentageInput: '',
      validActivityData: false,
      validPrice: false,
      validPercentage: false
    });

    this.toHome();

    //Save to DB
    submitEntryType({ entryType: entryTypeToAdd, key: entryTypeId });
  };

  handleTextChange = (text, name) => {
    this.setState(previousState => ({
      ...previousState,
      [name]: text,
      validActivityData:
        text !== '' && previousState.validPercentage && previousState.validPrice
    }));
  };

  render() {
    const {
      nameInput,
      priceInput,
      percentageInput,
      validActivityData
    } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
        <Text style={styles.headerText}> Add a new Activity </Text>
        <TextInput
          value={nameInput}
          onChangeText={text => this.handleTextChange(text, 'nameInput')}
          placeholder='Enter the activity name'
          style={styles.inputStyle}
        />
        <NumericInput
          value={priceInput}
          onChangeText={text => this.handleTextChange(text, 'priceInput')}
          placeholder='Enter the price'
          pattern={['^[1-9]\\d{0,9}(,\\d{0,2})?$']}
          onValidation={isValid =>
            this.setState(previousState => ({
              ...previousState,
              validPrice: isValid
            }))
          }
          keyboardType={'numeric'}
          style={styles.inputStyle}
        />
        <NumericInput
          value={percentageInput}
          onChangeText={text => this.handleTextChange(text, 'percentageInput')}
          placeholder='Enter the percentage'
          pattern={[
            '(^100(\\,0{1,2})?$)|(^([1-9]([0-9])?|0)(\\,[0-9]{1,2})?$)'
          ]}
          onValidation={isValid =>
            this.setState(previousState => ({
              ...previousState,
              validPercentage: isValid
            }))
          }
          keyboardType={'numeric'}
          style={styles.inputStyle}
        />
        <SubmitButton onPress={this.submit} disabled={!validActivityData}>
          SUBMIT
        </SubmitButton>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  inputStyle: {
    textAlign: 'center',
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: pink,
    marginBottom: 10
  }
});

const mapStateToProps = ({ entryTypes }) => ({
  entryTypes
});

export default connect(mapStateToProps)(AddEntryType);
