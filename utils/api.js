/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

import { AsyncStorage } from 'react-native';
import { fetchCalendarResults } from './calendar_api';
import { fetchEntryTypesResults } from './entryTypes_api';

export function fetchDatabaseResults() {
  return Promise.all([fetchCalendarResults(), fetchEntryTypesResults()]).then(
    ([entries, entryTypes]) => ({
      entries,
      entryTypes
    })
  );
}
export function clearDatabase() {
  AsyncStorage.clear();
}
