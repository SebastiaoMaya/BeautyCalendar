export const RECEIVE_ENTRY_TYPES = 'RECEIVE_ENTRY_TYPES';
export const ADD_ENTRY_TYPE = 'ADD_ENTRY_TYPE';

export const receiveEntryTypes = entryTypes => ({
  type: RECEIVE_ENTRY_TYPES,
  entryTypes
});

export const addEntryType = entryType => ({
  type: ADD_ENTRY_TYPE,
  entryType
});
