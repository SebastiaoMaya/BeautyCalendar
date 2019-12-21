import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { connect } from 'react-redux';
import { darkPink, green, lightPink, pink } from '../../utils/colors';
import * as Constants from '../../utils/constants';
import {
  formatEarningsToMaxSixEntries,
  getActivityChartSortedData
} from '../../utils/helpers';

class ActivityChart extends PureComponent {
  renderLineChart = activityChartData => {
    if (
      activityChartData.earnings.length !== 0 &&
      activityChartData.months.length !== 0
    ) {
      return (
        <View>
          <LineChart
            data={{
              labels: formatEarningsToMaxSixEntries(activityChartData.months),
              datasets: [
                {
                  data: formatEarningsToMaxSixEntries(
                    activityChartData.earnings
                  )
                }
              ]
            }}
            width={Dimensions.get('window').width}
            height={220}
            yAxisSuffix={Constants.EURO}
            chartConfig={{
              backgroundColor: pink,
              backgroundGradientFrom: lightPink,
              backgroundGradientTo: darkPink,
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: darkPink
              }
            }}
            bezier
            style={styles.lineChart}
          />
          <Text style={styles.earningsOnMonth}>
            {`${
              Constants.MONTH_EARNINGS
            }  ${activityChartData.currentEarnings || 0}${Constants.EURO}`}
          </Text>
        </View>
      );
    } else {
      return (
        <Text style={[styles.center, styles.noEntriesMsg]}>
          {Constants.SEE_ACTIVITY_CHART_ERROR}
        </Text>
      );
    }
  };

  render() {
    const { entries, activities } = this.props;
    const activityChartData = getActivityChartSortedData(entries, activities);

    return (
      <View style={styles.container}>
        <Text style={styles.textHeader}>{Constants.ACTIVITY_CHART}</Text>
        {this.renderLineChart(activityChartData)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20
  },
  lineChart: {
    alignItems: 'center',
    marginVertical: 8,
    margin: 20,
    borderRadius: 16,
    paddingBottom: 10
  },
  textHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 20
  },
  earningsOnMonth: {
    color: green,
    fontSize: 16
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'center'
  },
  noEntriesMsg: {
    fontSize: 18
  }
});

const mapStateToProps = ({ entries, activities }) => ({
  entries,
  activities
});

export default connect(mapStateToProps)(ActivityChart);
