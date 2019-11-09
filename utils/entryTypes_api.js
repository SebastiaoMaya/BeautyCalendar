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
      type: 'steppers'
    },
    pedicure: {
      displayName: 'Pedicure',
      max: 50,
      step: 1,
      type: 'steppers'
    },
    massagem_relaxamento: {
      displayName: 'Massagem Relaxamento',
      max: 50,
      step: 1,
      type: 'steppers'
    }
  };

  AsyncStorage.setItem(ENTRY_TYPES_STORAGE_KEY, JSON.stringify(dummyData));

  return dummyData;
}
