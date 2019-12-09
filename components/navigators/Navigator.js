/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation-tabs';
import { pink, white } from '../../utils/colors';
import AddActivity from '../activity/AddActivity';
import AddEntry from '../entry/AddEntry';
import EntryDetail from '../entry/EntryDetail';
import History from '../history/History';

const createPlatformNavigation = () => {
  return Platform.OS === 'ios'
    ? createBottomTabNavigator
    : createMaterialTopTabNavigator;
};

const TabNavigator = createPlatformNavigation()(
  {
    History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
        )
      }
    },
    AddEntry: {
      screen: AddEntry,
      navigationOptions: {
        tabBarLabel: 'Add Entry',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name='plus-square' size={30} color={tintColor} />
        )
      }
    },
    AddActivity: {
      screen: AddActivity,
      navigationOptions: {
        tabBarLabel: 'Add Activity',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name='plus-square' size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? pink : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : pink,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const HistoryStackNavigator = createStackNavigator(
  {
    History,
    EntryDetail: {
      screen: EntryDetail,
      navigationOptions: {
        headerTitle: 'Entry Details'
      }
    },
    AddEntry,
    TabNavigator
  },
  {
    initialRouteName: 'TabNavigator'
  }
);

const Navigator = createAppContainer(HistoryStackNavigator);

export default createAppContainer(Navigator);
