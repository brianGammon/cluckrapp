// @flow
export const actionTypes = {
  CREATE_REQUESTED: 'CREATE_REQUESTED',
  CREATE_FULFILLED: 'CREATE_FULFILLED',
  CREATE_REJECTED: 'CREATE_REJECTED',

  UPDATE_REQUESTED: 'UPDATE_REQUESTED',
  UPDATE_FULFILLED: 'UPDATE_FULFILLED',
  UPDATE_REJECTED: 'UPDATE_REJECTED',

  REMOVE_REQUESTED: 'REMOVE_REQUESTED',
  REMOVE_FULFILLED: 'REMOVE_FULFILLED',
  REMOVE_REJECTED: 'REMOVE_REJECTED',

  LISTEN_REQUESTED: 'LISTEN_REQUESTED',
  LISTEN_FULFILLED: 'LISTEN_FULFILLED',
  LISTEN_REJECTED: 'LISTEN_REJECTED',

  LISTEN_REMOVED: 'LISTEN_REMOVED',

  REMOVE_LISTENER_REQUESTED: 'REMOVE_LISTENER_REQUESTED',
  REMOVE_ALL_LISTENERS_REQUESTED: 'REMOVE_ALL_LISTENERS_REQUESTED',

  GET_FLOCK_REQUESTED: 'GET_FLOCK_REQUESTED',
  GET_FLOCK_FULFILLED: 'GET_FLOCK_FULFILLED',
  GET_FLOCK_REJECTED: 'GET_FLOCK_REJECTED',
  CLEAR_FLOCKS: 'CLEAR_FLOCKS',

  CHILD_ADDED: 'CHILD_ADDED',
  CHILD_CHANGED: 'CHILD_CHANGED',
  CHILD_REMOVED: 'CHILD_REMOVED',

  SET_INITIAL_URL: 'SET_INITIAL_URL',
  REMOVE_INITIAL_URL: 'REMOVE_INITIAL_URL',

  AUTH_STATUS_LOGGED_IN: 'AUTH_STATUS_LOGGED_IN',
  AUTH_STATUS_LOGGED_OUT: 'AUTH_STATUS_LOGGED_OUT',
  SIGN_OUT_REQUESTED: 'SIGN_OUT_REQUESTED',
};

export const metaTypes = {
  userSettings: 'userSettings',
  flocks: 'flocks',
  chickens: 'chickens',
  eggs: 'eggs',
};

export const eventTypes = {
  CHILD_ADDED_EVENT: 'CHILD_ADDED_EVENT',
  CHILD_REMOVED_EVENT: 'CHILD_REMOVED_EVENT',
  CHILD_CHANGED_EVENT: 'CHILD_CHANGED_EVENT',
  AUTH_STATUS_CHANGED: 'AUTH_STATUS',
};

export const appStates = {
  STARTING: 'STARTING',
  BUSY: 'BUSY',
  READY: 'READY',
};
