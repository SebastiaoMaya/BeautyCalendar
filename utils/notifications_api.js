import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';
import * as Constants from './constants';
import { getHoursAndMinutesFromString } from '../utils/helpers';

const NOTIFICATIONS_KEY = 'BeautyCalendar:notifications';

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATIONS_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync()
  );
}

function createNotification() {
  return {
    title: Constants.NOTIFICATION_TITLE,
    body: Constants.NOTIFICATION_BODY,
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATIONS_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === Constants.PERMISSION_GRANTED) {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            let timeOfNotification = getHoursAndMinutesFromString(
              Constants.NOTIFICATION_TIME
            );
            tomorrow.setHours(timeOfNotification.hours);
            tomorrow.setMinutes(timeOfNotification.minutes);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: 'day'
            });

            AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
