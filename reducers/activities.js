/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

import { ADD_ACTIVITY, RECEIVE_ACTIVITIES } from '../actions/activities';

const activities = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ACTIVITIES:
      return {
        ...state,
        ...action.activities
      };
    case ADD_ACTIVITY:
      return {
        ...state,
        ...action.activity
      };
    default:
      return state;
  }
};

export default activities;
