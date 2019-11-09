import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { addEntry } from '../../actions/entries';
import { removeEntry } from '../../utils/calendar_api';
import { white } from '../../utils/colors';
import { getDailyReminderValue, timeToString } from '../../utils/helpers';
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

  renderEmptyEntry = () => {
    return (
      <View style={styles.container}>
        <Text>teste</Text>
      </View>
    );
  };

  renderEntry = metrics => {
    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <TextButton onPress={this.reset} style={{ margin: 20 }}>
          Reset
        </TextButton>
      </View>
    );
  };

  render() {
    const { metrics } = this.props;

    return metrics && metrics.length !== 0
      ? this.renderEntry(metrics[0])
      : this.renderEmptyEntry();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
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
          [entryId]: timeToString === entryId ? getDailyReminderValue() : []
        })
      ),
    goBack: () => navigation.goBack()
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryDetail);
