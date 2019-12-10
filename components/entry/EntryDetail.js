/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { addEntry } from '../../actions/entries';
import { removeEntry } from '../../utils/calendar_api';
import { white } from '../../utils/colors';
import * as Constants from '../../utils/constants';
import TextButton from '../buttons/TextButton';
import MetricCard from '../history/MetricCard';

class EntryDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params;

    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    return {
      title: `${month}/${day}/${year}`
    };
  };

  reset = () => {
    const { remove, goBack, entryId } = this.props;

    remove();
    goBack();
    removeEntry(entryId);
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.metrics !== null;
  }

  render() {
    const { metrics, entryId } = this.props;

    if (metrics) {
      return (
        <View style={styles.container}>
          <Text style={styles.activitiesHeader}>
            {Constants.ACTIVITIES_FOR + entryId}
          </Text>
          <MetricCard style={styles.item} metrics={metrics} />
          <TextButton onPress={this.reset} style={{ margin: 20 }}>
            {Constants.RESET}
          </TextButton>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 45,
    justifyContent: 'flex-start'
  },
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  activitiesHeader: {
    fontSize: 22
  }
});

const mapStateToProps = ({ entries }, { navigation }) => {
  const { entryId } = navigation.state.params;

  return {
    entryId,
    metrics: entries[entryId]
  };
};

const mapDispatchToProps = (dispatch, { navigation }) => {
  const { entryId } = navigation.state.params;

  return {
    remove: () =>
      dispatch(
        addEntry({
          [entryId]: null
        })
      ),
    goBack: () => navigation.goBack()
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
