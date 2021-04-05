/**
 *
 * ListItem
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ListItem() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ListItem.propTypes = {};

export default ListItem;
