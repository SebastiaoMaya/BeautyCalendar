/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

import { AppLoading } from 'expo';
import React, { Component } from 'react';
import { IsEqual } from 'react-lodash';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import { connect } from 'react-redux';
import { receiveActivities } from '../../actions/activities';
import { receiveEntries } from '../../actions/entries';
import { fetchDatabaseResults } from '../../utils/api';
import { white } from '../../utils/colors';
import * as Constants from '../../utils/constants';
import { formatEntriesForAgenda, timeToString } from '../../utils/helpers';
import MetricCard from './MetricCard';

class History extends Component {
  state = {
    ready: false
  };

  componentDidMount() {
    const { dispatch } = this.props;

    //clearDatabase();

    fetchDatabaseResults()
      .then(({ entries, activities }) => {
        dispatch(receiveEntries(entries));
        dispatch(receiveActivities(activities));
      })
      .then(() =>
        this.setState(() => ({
          ready: true
        }))
      );
  }

  rowHasChanged = (r1, r2) => {
    return <IsEqual value={r1} other={r2} />;
  };

  renderItem = item => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('EntryDetail', {
            entryId: item.key
          });
        }}
      >
        <MetricCard metrics={item} />
      </TouchableOpacity>
    </View>
  );

  renderEmptyDate = date => {
    const emptyDate = timeToString(date);

    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AddEntry', {
              date: emptyDate
            });
          }}
        >
          <Text style={styles.noDataText}>
            {Constants.NO_DATA_FOR_THIS_DAY}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { entries } = this.props;
    const { ready } = this.state;
    if (!ready) {
      return <AppLoading />;
    }
    return (
      <Agenda
        items={formatEntriesForAgenda(entries)}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
});

const mapStateToProps = ({ entries, activities }) => ({
  entries,
  activities
});

export default connect(mapStateToProps)(History);
