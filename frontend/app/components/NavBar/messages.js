/*
 * NavBar Messages
 *
 * This contains all the text for the NavBar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.NavBar';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  allStrings: {
    id: `${scope}.allStrings`,
    defaultMessage: 'Strings',
  },
  addString: {
    id: `${scope}.addString`,
    defaultMessage: 'Add String',
  },
});
