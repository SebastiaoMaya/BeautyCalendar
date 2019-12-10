/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { addActivity } from '../../actions/activities';
import { submitActivity } from '../../utils/activities_api';
import { pink } from '../../utils/colors';
import * as Constants from '../../utils/constants';
import { getActivityIdFromName } from '../../utils/helpers';
import SubmitButton from '../buttons/SubmitButton';
import NumericInput from '../inputs/NumericInput';
import ValidatedTextInput from '../inputs/ValidatedTextInput';

class AddActivity extends Component {
  state = {
    nameInput: '',
    priceInput: '',
    percentageInput: '',
    validPrice: false,
    validPercentage: false,
    validActivityName: false
  };

  toHome = () => {
    this.props.navigation.dispatch(
      NavigationActions.back({
        key: 'AddActivity'
      })
    );
  };

  submit = () => {
    const { dispatch, activities } = this.props;

    const { nameInput, priceInput, percentageInput } = this.state;

    //Update Redux
    const activityId = getActivityIdFromName(nameInput);
    const activityToAdd = {
      displayName: nameInput,
      price: priceInput,
      percentage: percentageInput,
      type: 'steppers',
      step: 1,
      max: 50
    };
    dispatch(
      addActivity({
        [activityId]: activityToAdd
      })
    );

    this.setState({
      nameInput: '',
      priceInput: '',
      percentageInput: '',
      validActivityName: false,
      validPrice: false,
      validPercentage: false
    });

    this.toHome();

    //Save to DB
    submitActivity({ activity: activityToAdd, key: activityId });
  };

  handleTextChange = (text, name) => {
    this.setState(() => ({
      [name]: text
    }));
  };

  render() {
    const {
      nameInput,
      priceInput,
      percentageInput,
      validActivityName,
      validPrice,
      validPercentage
    } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
        <Text style={styles.headerText}> Add a new Activity </Text>
        <ValidatedTextInput
          value={nameInput}
          onChangeText={text => this.handleTextChange(text, 'nameInput')}
          placeholder='Enter the activity name'
          onValidation={isValid =>
            this.setState(() => ({
              validActivityName: isValid
            }))
          }
          style={styles.inputStyle}
        />
        <NumericInput
          value={priceInput}
          onChangeText={text => this.handleTextChange(text, 'priceInput')}
          placeholder='Enter the price'
          pattern={'^[1-9]\\d{0,9}(,\\d{0,2})?$'}
          onValidation={isValid =>
            this.setState(() => ({
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
          pattern={'(^100(\\,0{1,2})?$)|(^([1-9]([0-9])?|0)(\\,[0-9]{1,2})?$)'}
          onValidation={isValid =>
            this.setState(() => ({
              validPercentage: isValid
            }))
          }
          keyboardType={'numeric'}
          style={styles.inputStyle}
        />
        <SubmitButton
          onPress={this.submit}
          disabled={!(validActivityName && validPrice && validPercentage)}
        >
          {Constants.SUBMIT}
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

const mapStateToProps = ({ activities }) => ({
  activities
});

export default connect(mapStateToProps)(AddActivity);
