import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { gray } from '../../utils/colors';

const MetricCard = ({ metrics, entryTypes }) => {
  return (
    <View>
      {Object.keys(metrics).map(metric => {
        const { displayName } = entryTypes[metric];

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
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  metric: {
    flexDirection: 'row',
    marginTop: 12
  }
});

const mapStateToProps = ({ entryTypes }) => ({
  entryTypes
});

export default connect(mapStateToProps)(MetricCard);
