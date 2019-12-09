/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

export const RECEIVE_ACTIVITIES = 'RECEIVE_ACTIVITIES';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';

export const receiveActivities = activities => ({
  type: RECEIVE_ACTIVITIES,
  activities
});

export const addActivity = activity => ({
  type: ADD_ACTIVITY,
  activity
});
