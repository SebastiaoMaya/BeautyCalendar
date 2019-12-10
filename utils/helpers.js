/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

import { NOTIFICATION_BODY } from './constants';

export function timeToString(time = Date.now()) {
  const date = new Date(time);
  const todayUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return todayUTC.toISOString().split('T')[0];
}

export function getRandomNumber(max) {
  return Math.floor(Math.random() * max) + 0;
}

export function getDailyReminderValue() {
  return {
    today: NOTIFICATION_BODY
  };
}

export function getHoursAndMinutesFromString(timeString) {
  const splittedTime = timeString.split('h');

  //default value 20h00
  if (splittedTime && splittedTime.length !== 2) {
    return {
      hours: parseInt('20'),
      minutes: parseInt('00')
    };
  }

  return {
    hours: parseInt(splittedTime[0]),
    minutes: parseInt(splittedTime[1])
  };
}

export function formatEntriesForAgenda(entries) {
  const formattedEntries = {};
  Object.keys(entries).forEach(key => {
    if (entries[key]) {
      formattedEntries[key] = [Object.assign({}, entries[key])];
    } else {
      formattedEntries[key] = [];
    }
  });

  return formattedEntries;
}

export function getActivityIdFromName(name) {
  return name.replace(/ /g, '_');
}
