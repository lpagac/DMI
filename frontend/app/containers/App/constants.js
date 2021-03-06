/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_STRINGS = 'takeHome/App/LOAD_STRINGS';
export const LOAD_STRINGS_SUCCESS = 'takeHome/App/LOAD_STRINGS_SUCCESS';
export const LOAD_STRINGS_ERROR = 'takeHome/App/LOAD_STRINGS_ERROR';
export const ADD_STRING = 'takeHome/App/ADD_STRING';
export const ADD_STRING_SUCCESS = 'takeHome/App/ADD_STRING_SUCCESS';
export const ADD_STRING_ERROR = 'takeHome/App/ADD_STRING_ERROR';
export const CLEAR_ADD_NOTIFICATIONS = 'takeHome/App/CLEAR_ADD_NOTIFICATIONS';
