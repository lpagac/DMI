/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Check out our latest strings!',
  },
  subHeader: {
    id: `${scope}.subHeader`,
    defaultMessage: 'Limited time only... Add your own string!',
  },
});
