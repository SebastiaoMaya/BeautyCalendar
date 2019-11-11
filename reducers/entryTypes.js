/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

import { ADD_ENTRY_TYPE, RECEIVE_ENTRY_TYPES } from '../actions/entryTypes';

const entryTypes = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ENTRY_TYPES:
      return {
        ...state,
        ...action.entryTypes
      };
    case ADD_ENTRY_TYPE:
      return {
        ...state,
        ...action.entryType
      };
    default:
      return state;
  }
};

export default entryTypes;
