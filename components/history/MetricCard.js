/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { gray, green } from '../../utils/colors';
import * as Constants from '../../utils/constants';
import { calculatePriceAndPercentageOnDay } from '../../utils/helpers';

const MetricCard = ({ metrics, activities, style }) => {
  const { totalPrice, priceWithPercentage } = calculatePriceAndPercentageOnDay(
    metrics,
    activities
  );

  return (
    <View style={style || styles.container}>
      {Object.keys(metrics).map(metric => {
        if (metric !== 'key' && metrics[metric]) {
          const { displayName } = activities[metric];
          return (
            <View style={styles.metricContainer} key={metric}>
              <View style={styles.metricVal}>
                <Text style={{ fontSize: 20 }}>{displayName}</Text>
                <Text style={{ fontSize: 16, color: gray }}>
                  {metrics[metric]}
                </Text>
              </View>
              <Text style={{ color: green }}>
                {(metrics[metric] *
                  activities[metric].price *
                  activities[metric].percentage) /
                  100 +
                  Constants.EURO}
              </Text>
            </View>
          );
        }
      })}
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.totalText}> {Constants.TOTAL_LABEL} </Text>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPrice}>{totalPrice + Constants.EURO}</Text>
          <Text style={styles.priceWithPercentage}>
            {priceWithPercentage + Constants.EURO}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  totalText: {
    paddingTop: 20,
    fontSize: 16,
    fontWeight: 'bold'
  },
  metricVal: {
    marginTop: 12,
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  metricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  totalPrice: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontSize: 16,
    marginRight: 5
  },
  priceWithPercentage: {
    fontSize: 24,
    color: green
  }
});

const mapStateToProps = ({ activities }) => ({
  activities
});

export default connect(mapStateToProps)(MetricCard);
