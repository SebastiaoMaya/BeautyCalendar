/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

import { AsyncStorage } from 'react-native';
import { getRandomNumber, timeToString } from './helpers';

export const CALENDAR_STORAGE_KEY = 'BeautyCalendar:entries';

export function fetchCalendarResults() {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(formatCalendarResults);
}

export function submitEntry({ entry, key }) {
  return AsyncStorage.mergeItem(
    CALENDAR_STORAGE_KEY,
    JSON.stringify({
      [key]: { key, ...entry }
    })
  );
}

export function removeEntry(key) {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);

    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
  });
}

function setDummyData() {
  let dummyData = {};
  const timestamp = Date.now();

  for (let i = -10; i < 0; i++) {
    const time = timestamp + i * 24 * 60 * 60 * 1000;
    const strTime = timeToString(time);
    dummyData[strTime] =
      getRandomNumber(3) % 2 === 0
        ? {
            key: strTime,
            linha: getRandomNumber(50),
            pedicure: getRandomNumber(50),
            massagem_relaxamento: getRandomNumber(50)
          }
        : null;
  }

  AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(dummyData));

  return dummyData;
}

function setMissingDates(dates) {
  const timestamp = Date.now();

  for (let i = -183; i < 0; i++) {
    const time = timestamp + i * 24 * 60 * 60 * 1000;
    const strTime = timeToString(time);

    if (typeof dates[strTime] === 'undefined') {
      dates[strTime] = null;
    }
  }

  return dates;
}

export function formatCalendarResults(results) {
  return results === null
    ? setDummyData()
    : setMissingDates(JSON.parse(results));
}
