/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOAD_STRINGS_SUCCESS,
  LOAD_STRINGS,
  LOAD_STRINGS_ERROR,
  ADD_STRING,
  ADD_STRING_SUCCESS,
  ADD_STRING_ERROR,
  CLEAR_ADD_NOTIFICATIONS,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  strings: false,
  addingString: false,
  addingStringSuccess: false,
  addingStringError: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_STRINGS: {
        draft.loading = true;
        draft.error = false;
        draft.strings = false;
        break;
      }

      case LOAD_STRINGS_SUCCESS: {
        draft.strings = action.strings;
        draft.loading = false;
        draft.error = false;
        break;
      }

      case LOAD_STRINGS_ERROR: {
        draft.error = action.error;
        draft.loading = false;
        draft.strings = false;
        break;
      }

      case ADD_STRING: {
        draft.addingString = true;
        draft.addingStringError = false;
        draft.addingStringSuccess = false;
        break;
      }

      case ADD_STRING_SUCCESS: {
        const { id, string } = action;
        if (draft.strings) {
          draft.strings.unshift({ id, string });
        } else {
          draft.strings = action.strings;
        }
        draft.addingStringSuccess = true;
        draft.addingString = false;
        draft.addingStringError = false;
        break;
      }
      case ADD_STRING_ERROR: {
        draft.addingStringError = action.error;
        draft.addingString = false;
        draft.addingStringSuccess = false;
        break;
      }
      case CLEAR_ADD_NOTIFICATIONS: {
        draft.addingStringError = false;
        draft.addingString = false;
        draft.addingStringSuccess = false;
        break;
      }
    }
  });

export default appReducer;
