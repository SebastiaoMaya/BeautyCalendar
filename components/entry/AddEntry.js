/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { NavigationActions, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { addEntry } from '../../actions/entries';
import { removeEntry, submitEntry } from '../../utils/calendar_api';
import { white } from '../../utils/colors';
import { timeToString } from '../../utils/helpers';
import SubmitButton from '../buttons/SubmitButton';
import TextButton from '../buttons/TextButton';
import ChangeEntryRow from './ChangeEntryRow';

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

  renderEntryType = ({ item }) => {
    const value = this.state[item.key];
    return (
      <ChangeEntryRow
        item={item}
        value={value}
        decrement={() => this.decrement(item.key)}
        increment={() => this.increment(item.key)}
      />
    );
  };

  submit = () => {
    const { dispatch, entryTypes, date } = this.props;

    const key = date ? date : timeToString();
    const entry = this.state;

    //Update Redux
    dispatch(
      addEntry({
        [key]: { key: key, ...entry }
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
    const { dispatch, date } = this.props;
    const key = date ? date : timeToString();

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
    const { entryTypes, date } = this.props;

    const entryTypesArray = Object.keys(entryTypes).map(key => ({
      key,
      ...entryTypes[key]
    }));

    let dateToRecord = date;

    if (!date) {
      dateToRecord = timeToString();
    }

    return (
      <View style={styles.container}>
        <Text style={styles.activitiesHeader}>
          Activities for {dateToRecord}
        </Text>
        <View style={styles.entriesContainer}>
          <FlatList data={entryTypesArray} renderItem={this.renderEntryType} />
        </View>
        <SubmitButton onPress={this.submit}> SUBMIT </SubmitButton>
        <TextButton onPress={this.reset} style={{ padding: 10 }}>
          Reset
        </TextButton>
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
  entriesContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'center'
  },
  entryTypeDisplayName: {
    fontSize: 16,
    width: 150,
    paddingLeft: 20
  },
  activitiesHeader: {
    fontSize: 22
  }
});

const mapStateToProps = ({ entryTypes }, { navigation }) => {
  let date;
  if (navigation.state.params) {
    date = navigation.state.params.date;
  }

  return {
    entryTypes,
    date
  };
};

export default withNavigation(connect(mapStateToProps)(AddEntry));
