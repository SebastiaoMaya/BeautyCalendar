/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

import { AsyncStorage } from 'react-native';

export const ENTRY_TYPES_STORAGE_KEY = 'BeautyCalendar:entryTypes';

export function fetchEntryTypesResults() {
  return AsyncStorage.getItem(ENTRY_TYPES_STORAGE_KEY).then(
    parseEntryTypesResults
  );
}

function parseEntryTypesResults(results) {
  return results === null ? setDummyEntryTypes() : JSON.parse(results);
}

function setDummyEntryTypes() {
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

  AsyncStorage.setItem(ENTRY_TYPES_STORAGE_KEY, JSON.stringify(dummyData));

  return dummyData;
}
