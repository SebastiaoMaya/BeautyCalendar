import { combineReducers } from 'redux';
import entries from './entries';
import entryTypes from './entryTypes';

export default combineReducers({
  entries,
  entryTypes
});
