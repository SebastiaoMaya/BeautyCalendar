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
import * as Constants from '../../utils/constants';
import { timeToString } from '../../utils/helpers';
import SubmitButton from '../buttons/SubmitButton';
import ChangeEntryRow from './ChangeEntryRow';

class AddEntry extends Component {
  state = {};

  constructor(props) {
    super(props);
    const { activities } = props;
    Object.keys(activities).forEach(activity => (this.state[activity] = 0));
  }

  static getDerivedStateFromProps(props, state) {
    const { activities } = props;
    const newState = {};
    Object.keys(activities).forEach(activity => {
      if (!state[activity]) {
        newState[activity] = 0;
      }
    });
    return { ...state, ...newState };
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

  submit = () => {
    const { dispatch, activities, navigation } = this.props;
    const key = navigation.getParam('date', timeToString());

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
    const { dispatch, navigation } = this.props;
    const key = navigation.getParam('date', timeToString());

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

  isSubmitDisabled = () => {
    return Object.keys(this.state).every(key => this.state[key] === 0);
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

  renderActivitiesOrEmptyActivities = (activitiesArray, dateToRecord) => {
    if (activitiesArray.length !== 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.activitiesHeader}>{dateToRecord}</Text>
          <View style={styles.entriesContainer}>
            <FlatList data={activitiesArray} renderItem={this.renderActivity} />
          </View>
          <SubmitButton
            onPress={this.submit}
            disabled={this.isSubmitDisabled()}
          >
            {Constants.SUBMIT}
          </SubmitButton>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={[styles.activitiesHeader, styles.center]}>
            {Constants.ADD_ACTIVITIES_ERROR}
          </Text>
        </View>
      );
    }
  };

  render() {
    const { activities, navigation } = this.props;
    const date = navigation.getParam('date', timeToString());

    const activitiesArray = Object.keys(activities).map(key => ({
      key,
      ...activities[key]
    }));

    return this.renderActivitiesOrEmptyActivities(activitiesArray, date);
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
    fontSize: 16
  },
  activitiesHeader: {
    fontSize: 22
  }
});

const mapStateToProps = ({ activities, entries }) => {
  return {
    activities,
    entries
  };
};

export default withNavigation(connect(mapStateToProps)(AddEntry));
