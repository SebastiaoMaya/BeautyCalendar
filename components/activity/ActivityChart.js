import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { connect } from 'react-redux';
import { darkPink, lightPink, pink } from '../../utils/colors';
import { calculateEarningsPerYear } from '../../utils/helpers';

class ActivityChart extends Component {
  render() {
    const { entries, activities } = this.props;

    console.log(calculateEarningsPerYear(entries, activities));
    return (
      <View style={styles.container}>
        <Text style={styles.textHeader}>Activity Chart</Text>
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={Dimensions.get('window').width}
          height={220}
          yAxisLabel={'$'}
          yAxisSuffix={'k'}
          chartConfig={{
            backgroundColor: pink,
            backgroundGradientFrom: lightPink,
            backgroundGradientTo: darkPink,
            decimalPlaces: 2, // optional, defaults to 2dp
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  lineChart: {
    alignItems: 'center',
    marginVertical: 8,
    margin: 20,
    borderRadius: 16
  },
  textHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 10
  }
});

const mapStateToProps = ({ entries, activities }) => ({
  entries,
  activities
});

export default connect(mapStateToProps)(ActivityChart);
