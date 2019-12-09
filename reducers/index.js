/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

import { combineReducers } from 'redux';
import activities from './activities';
import entries from './entries';

export default combineReducers({
  entries,
  activities
});
