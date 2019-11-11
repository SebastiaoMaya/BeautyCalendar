/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

import { combineReducers } from 'redux';
import entries from './entries';
import entryTypes from './entryTypes';

export default combineReducers({
  entries,
  entryTypes
});
