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

  CLEAR_ERROR: 'CLEAR_ERROR',
  CLEAR_AUTH_ERROR: 'CLEAR_AUTH_ERROR',

  SYNC_FLOCKS_REQUESTED: 'SYNC_FLOCKS_REQUESTED',
  SYNC_FLOCKS_REJECTED: 'SYNC_FLOCKS_REJECTED',
  SYNC_FLOCKS_FULFILLED: 'SYNC_FLOCKS_FULFILLED',

  SET_FLOCK: 'SET_FLOCK',
  CLEAR_FLOCK: 'CLEAR_FLOCK',
  CLEAR_ALL_FLOCKS: 'CLEAR_ALL_FLOCKS',

  UNLINK_FLOCK_REQUESTED: 'UNLINK_FLOCK_REQUESTED',
  UNLINK_FLOCK_FULFILLED: 'UNLINK_FLOCK_FULFILLED',

  DELETE_FLOCK_REQUESTED: 'DELETE_FLOCK_REQUESTED',
  DELETE_FLOCK_FULFILLED: 'DELETE_FLOCK_FULFILLED',
  DELETE_FLOCK_REJECTED: 'DELETE_FLOCK_REJECTED',

  DELETE_CHICKEN_REQUESTED: 'DELETE_CHICKEN_REQUESTED',
  DELETE_CHICKEN_FULFILLED: 'DELETE_CHICKEN_FULFILLED',
  DELETE_CHICKEN_REJECTED: 'DELETE_CHICKEN_REJECTED',

  JOIN_FLOCK_REQUESTED: 'JOIN_FLOCK_REQUESTED',
  JOIN_FLOCK_FULFILLED: 'JOIN_FLOCK_FULFILLED',
  JOIN_FLOCK_REJECTED: 'JOIN_FLOCK_REJECTED',

  ADD_FLOCK_REQUESTED: 'ADD_FLOCK_REQUESTED',
  ADD_FLOCK_FULFILLED: 'ADD_FLOCK_FULFILLED',
  ADD_FLOCK_REJECTED: 'ADD_FLOCK_REJECTED',

  SWITCH_FLOCK_REQUESTED: 'SWITCH_FLOCK_REQUESTED',
  SWITCH_FLOCK_FULFILLED: 'SWITCH_FLOCK_FULFILLED',

  SAVE_CHICKEN_REQUESTED: 'SAVE_CHICKEN_REQUESTED',

  CHILD_ADDED: 'CHILD_ADDED',
  CHILD_CHANGED: 'CHILD_CHANGED',
  CHILD_REMOVED: 'CHILD_REMOVED',

  SET_INITIAL_URL: 'SET_INITIAL_URL',
  REMOVE_INITIAL_URL: 'REMOVE_INITIAL_URL',

  AUTH_STATUS_LOGGED_IN: 'AUTH_STATUS_LOGGED_IN',
  AUTH_STATUS_LOGGED_OUT: 'AUTH_STATUS_LOGGED_OUT',

  SIGN_OUT_REQUESTED: 'SIGN_OUT_REQUESTED',

  AUTH_ACTION_REQUESTED: 'AUTH_ACTION_REQUESTED',
  AUTH_ACTION_FULFILLED: 'AUTH_ACTION_FULFILLED',
  AUTH_ACTION_REJECTED: 'AUTH_ACTION_REJECTED',

  STORAGE_DELETE_REQUESTED: 'STORAGE_DELETE_REQUESTED',
  STORAGE_DELETE_FULFILLED: 'STORAGE_DELETE_FULFILLED',
  STORAGE_DELETE_REJECTED: 'STORAGE_DELETE_REJECTED',

  STORAGE_UPLOAD_REQUESTED: 'STORAGE_UPLOAD_REQUESTED',
  STORAGE_UPLOAD_FULFILLED: 'STORAGE_UPLOAD_FULFILLED',
  STORAGE_UPLOAD_REJECTED: 'STORAGE_UPLOAD_REJECTED',
};

export const metaTypes = {
  userSettings: 'userSettings',
  flocks: 'flocks',
  chickens: 'chickens',
  eggs: 'eggs',
};

export const authTypes = {
  signUp: 'signUp',
  signIn: 'signIn',
  resetPassword: 'resetPassword',
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
