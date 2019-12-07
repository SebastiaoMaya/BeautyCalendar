/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

import { Ionicons } from '@expo/vector-icons';
import { Platform } from '@unimodules/core';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { addEntry } from '../../actions/entries';
import { removeEntry, submitEntry } from '../../utils/calendar_api';
import { pink, white } from '../../utils/colors';
import { timeToString } from '../../utils/helpers';
import BeautySteppers from '../buttons/BeautySteppers';
import TextButton from '../buttons/TextButton';

const SubmitBtn = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn
      }
    >
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  );
};

class AddEntry extends Component {
  state = {};

  constructor(props) {
    super(props);
    const { entryTypes } = props;
    Object.keys(entryTypes).forEach(entryType => (this.state[entryType] = 0));
  }

  increment = metric => {
    const { entryTypes } = this.props;
    const { max, step } = entryTypes[metric];

    this.setState(currentState => {
      const count = currentState[metric] + step;

      return {
        ...currentState,
        [metric]: count > max ? max : count
      };
    });
  };

  decrement = metric => {
    const { entryTypes } = this.props;
    const { step } = entryTypes[metric];

    this.setState(currentState => {
      const count = currentState[metric] - step;

      return {
        ...currentState,
        [metric]: count < 0 ? 0 : count
      };
    });
  };

  submit = () => {
    const key = timeToString();
    const entry = this.state;
    const { dispatch, entryTypes } = this.props;

    //Update Redux
    dispatch(
      addEntry({
        [key]: { key, ...entry }
      })
    );

    const newState = {};
    Object.keys(entryTypes).forEach(entryType => (newState[entryType] = 0));
    this.setState(newState);

    this.toHome();

    //Save to DB
    submitEntry({ key, entry });
  };

  reset = () => {
    const key = timeToString();
    const { dispatch } = this.props;

    //Update Redux
    dispatch(
      addEntry({
        [key]: null
      })
    );

    this.toHome();

    //Update DB
    removeEntry(key);
  };

  toHome = () => {
    this.props.navigation.dispatch(
      NavigationActions.back({
        key: 'AddEntry'
      })
    );
  };

  render() {
    const { entryTypes } = this.props;

    if (this.props.alreadyLogged) {
      return (
        <View style={styles.center}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-happy' : 'md-happy'}
            size={100}
          />
          <Text>You already logged your information for today</Text>
          <TextButton onPress={this.reset} style={{ padding: 10 }}>
            Reset
          </TextButton>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {Object.keys(entryTypes).map(key => {
          const { ...rest } = entryTypes[key];
          const value = this.state[key];

          return (
            <View key={key} style={styles.row}>
              <Text>{key}</Text>
              <BeautySteppers
                value={value}
                onIncrement={() => this.increment(key)}
                onDecrement={() => this.decrement(key)}
                {...rest}
              />
            </View>
          );
        })}
        <SubmitBtn onPress={this.submit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  iosSubmitBtn: {
    backgroundColor: pink,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitBtn: {
    backgroundColor: pink,
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
    fontSize: 22,
    textAlign: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'center'
  }
});

const mapStateToProps = ({ entries, entryTypes }) => {
  const key = timeToString();

  return {
    alreadyLogged: entries[key] && typeof entries[key].today === 'undefined',
    entryTypes
  };
};

export default connect(mapStateToProps)(AddEntry);
