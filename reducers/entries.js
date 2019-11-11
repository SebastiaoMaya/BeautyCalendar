/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

import { ADD_ENTRY, RECEIVE_ENTRIES } from '../actions/entries';

const entries = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ENTRIES:
      return {
        ...state,
        ...action.entries
      };
    case ADD_ENTRY:
      return {
        ...state,
        ...action.entry
      };
    default:
      return state;
  }
};

export default entries;
