/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { gray, green } from '../../utils/colors';

const MetricCard = ({ metrics, activities }) => {
  let totalPrice = 0;
  let priceWithPercentage = 0;

  Object.keys(metrics).forEach(metric => {
    if (metric !== 'key' && metrics[metric]) {
      totalPrice += metrics[metric] * activities[metric].price;
      priceWithPercentage +=
        (metrics[metric] *
          activities[metric].price *
          activities[metric].percentage) /
        100;
    }
  });

  return (
    <View style={styles.container}>
      {Object.keys(metrics).map(metric => {
        if (metric !== 'key' && metrics[metric]) {
          const { displayName } = activities[metric];
          return (
            <View style={styles.metric} key={metric}>
              <View>
                <Text style={{ fontSize: 20 }}>{displayName}</Text>
                <Text style={{ fontSize: 16, color: gray }}>
                  {metrics[metric]}
                </Text>
              </View>
            </View>
          );
        }
      })}
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPrice}>{totalPrice}€</Text>
        <Text style={styles.priceWithPercentage}>{priceWithPercentage}€</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  metric: {
    flexDirection: 'row',
    marginTop: 12
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 20
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
