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

export function getCurrentYear() {
  return timeToString().slice(0, 4);
}

export function calculatePriceAndPercentageOnDay(entry, activities) {
  let totalPrice = 0;
  let priceWithPercentage = 0;

  Object.keys(entry).forEach(metric => {
    if (metric !== 'key' && entry[metric] && activities[metric]) {
      totalPrice += entry[metric] * activities[metric].price;
      priceWithPercentage +=
        (entry[metric] *
          activities[metric].price *
          activities[metric].percentage) /
        100;
    }
  });

  return {
    totalPrice,
    priceWithPercentage
  };
}

function calculateEarningOnMonth(earningsPerDay) {
  let earningsPerMonth = {};
  const currentYear = getCurrentYear();

  Object.keys(earningsPerDay).forEach(date => {
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);

    if (year === currentYear) {
      if (earningsPerMonth[month]) {
        earningsPerMonth[month] += earningOnDay[date].priceWithPercentage;
      } else {
        earningsPerMonth[month] = 0;
      }
    }
  });

  return earningsPerMonth;
}

export function calculateEarningsPerYear(entries, activities) {
  const priceAndPercentagePerDay = Object.keys(entries).map(entry => ({
    [entry]: calculatePriceAndPercentageOnDay(entry, activities)
  }));

  return calculateEarningOnMonth(priceAndPercentagePerDay);
}
