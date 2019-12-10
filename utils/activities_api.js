/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

import { AsyncStorage } from 'react-native';

export const ACTIVITIES_STORAGE_KEY = 'BeautyCalendar:activities';

export function fetchActivitiesResults() {
  return AsyncStorage.getItem(ACTIVITIES_STORAGE_KEY).then(
    parseActivitiesResults
  );
}

export function submitActivity({ activity, key }) {
  return AsyncStorage.mergeItem(
    ACTIVITIES_STORAGE_KEY,
    JSON.stringify({
      [key]: activity
    })
  );
}

function parseActivitiesResults(results) {
  //return results === null ? setDummyActivities() : JSON.parse(results);
  return JSON.parse(results);
}

function setDummyActivities() {
  const dummyData = {
    linha: {
      displayName: 'Linha',
      max: 50,
      step: 1,
      type: 'steppers',
      price: 20,
      percentage: 70
    },
    pedicure: {
      displayName: 'Pedicure',
      max: 50,
      step: 1,
      type: 'steppers',
      price: 15,
      percentage: 70
    },
    massagem_relaxamento: {
      displayName: 'Massagem Relaxamento',
      max: 50,
      step: 1,
      type: 'steppers',
      price: 35,
      percentage: 70
    }
  };

  AsyncStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(dummyData));

  return dummyData;
}
