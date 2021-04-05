/*
 * ListItem Messages
 *
 * This contains all the text for the ListItem component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ListItem';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ListItem component!',
  },
});
