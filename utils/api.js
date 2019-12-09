/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

import { AsyncStorage } from 'react-native';
import { fetchActivitiesResults } from './activities_api';
import { fetchCalendarResults } from './calendar_api';

export function fetchDatabaseResults() {
  return Promise.all([fetchCalendarResults(), fetchActivitiesResults()]).then(
    ([entries, activities]) => ({
      entries,
      activities
    })
  );
}
export function clearDatabase() {
  AsyncStorage.clear();
}
