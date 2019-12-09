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
    const { activities } = props;
    Object.keys(activities).forEach(activity => (this.state[activity] = 0));
  }

  increment = metric => {
    const { activities } = this.props;
    const { max, step } = activities[metric];

    this.setState(currentState => {
      const count = currentState[metric] + step;

      return {
        ...currentState,
        [metric]: count > max ? max : count
      };
    });
  };

  decrement = metric => {
    const { activities } = this.props;
    const { step } = activities[metric];

    this.setState(currentState => {
      const count = currentState[metric] - step;

      return {
        ...currentState,
        [metric]: count < 0 ? 0 : count
      };
    });
  };

  renderActivity = ({ item }) => {
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
    const { dispatch, activities, date } = this.props;

    const key = date ? date : timeToString();
    const entry = this.state;

    //Update Redux
    dispatch(
      addEntry({
        [key]: { key: key, ...entry }
      })
    );

    const newState = {};
    Object.keys(activities).forEach(activity => (newState[activity] = 0));
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
    const { activities, date } = this.props;

    const activitiesArray = Object.keys(activities).map(key => ({
      key,
      ...activities[key]
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
          <FlatList data={activitiesArray} renderItem={this.renderActivity} />
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
  activityDisplayName: {
    fontSize: 16,
    width: 150,
    paddingLeft: 20
  },
  activitiesHeader: {
    fontSize: 22
  }
});

const mapStateToProps = ({ activities }, { navigation }) => {
  let date;
  if (navigation.state.params) {
    date = navigation.state.params.date;
  }

  return {
    activities,
    date
  };
};

export default withNavigation(connect(mapStateToProps)(AddEntry));
