import {
  LOAD_STRINGS,
  LOAD_STRINGS_SUCCESS,
  LOAD_STRINGS_ERROR,
  ADD_STRING,
  ADD_STRING_ERROR,
  ADD_STRING_SUCCESS,
  CLEAR_ADD_NOTIFICATIONS,
} from './constants';

/**
 * Load the strings, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_STRINGS
 */
export function loadStrings() {
  return {
    type: LOAD_STRINGS,
  };
}

/**
 * Dispatched when the strings are loaded by the request saga
 *
 * @param  {array} strings array of strings from db
 *
 * @return {object}      An action object with a type of LOAD_STRINGS_SUCCESS passing the strings
 */
export function stringsLoaded(strings) {
  return {
    type: LOAD_STRINGS_SUCCESS,
    strings,
  };
}

/**
 * Dispatched when loading the strings fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_STRINGS_ERROR passing the error
 */
export function stringsLoadingError(error) {
  return {
    type: LOAD_STRINGS_ERROR,
    error,
  };
}

/**
 * Add a new string, this action starts the request saga
 *
 * @param {string} id the uuid for the string to add
 *
 * @param {string} string the string to add
 *
 * @return {object} An action object with a type of ADD_STRING, passes string and id
 */

export function addString(id, string) {
  return {
    type: ADD_STRING,
    id,
    string,
  };
}

/**
 * Dispatched when new string is added succesfully
 *
 * @param {string} id the uuid for the string that was added
 *
 * @param {string} string the string that was added
 *
 * @param {string} strings the strings that were returned from the saga
 *
 * @return {object} An action object with a type of ADD_STRING_SUCCESS, passes string and id and strings
 */
export function stringAdded(id, string, strings = false) {
  return {
    type: ADD_STRING_SUCCESS,
    id,
    string,
    strings,
  };
}

/**
 * Dispatched when an error occurs when trying to post a string
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of ADD_STRING_ERROR, passes the error message
 */

export function stringAddingError(error) {
  return {
    type: ADD_STRING_ERROR,
    error,
  };
}

/**
 * Dispatched when an error success occurs when trying to post a string
 *
 * @param  {object}  The error
 *
 * @return {object} An action object with a type of ADD_STRING_ERROR, passes the error message
 */

export function clearNotifications() {
  return {
    type: CLEAR_ADD_NOTIFICATIONS,
  };
}
