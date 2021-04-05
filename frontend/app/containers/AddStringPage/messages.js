/*
 * AddStringPage Messages
 *
 * This contains all the text for the AddStringPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AddStringPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Add A String!',
  },
  invalidInput: {
    id: `${scope}.invalidInput`,
    defaultMessage: 'Try adding some text!',
  },
  submit: {
    id: `${scope}.submit`,
    defaultMessage: 'ADD',
  },
  error: {
    id: `${scope}.error`,
    defaultMessage:
      'Unable to add string. Please check your input and try again.',
  },
  success: {
    id: `${scope}.success`,
    defaultMessage: 'Nice string! Add some more!',
  },
});
