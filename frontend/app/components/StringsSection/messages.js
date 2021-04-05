/*
 * StringsSection Messages
 *
 * This contains all the text for the StringsSection component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.StringsSection';

export default defineMessages({
  error: {
    id: `${scope}.error`,
    defaultMessage: 'Uh-Oh, No strings found. Try again later.',
  },
});
