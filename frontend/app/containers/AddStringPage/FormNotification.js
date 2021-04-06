import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectAddingStringSuccess,
  makeSelectAddingStringError,
  makeSelectAddingString,
} from 'containers/App/selectors';

import LoadingIndicator from 'components/LoadingIndicator';
import Notification from 'components/Notification';
import messages from './messages';

export function FormNotification({
  addingString,
  addingStringSuccess,
  addingStringError,
}) {
  if (addingString !== false) {
    return (
      <div data-testid="loading-indicator">
        <LoadingIndicator />
      </div>
    );
  }

  if (addingStringError !== false) {
    return (
      <Notification success={false}>
        <FormattedMessage {...messages.error} />
      </Notification>
    );
  }

  if (addingStringSuccess !== false) {
    return (
      <Notification success>
        <FormattedMessage {...messages.success} />
      </Notification>
    );
  }

  return null;
}

FormNotification.propTypes = {
  addingString: PropTypes.bool,
  addingStringError: PropTypes.any,
  addingStringSuccess: PropTypes.bool,
};

export const mapStateToProps = createStructuredSelector({
  addingString: makeSelectAddingString(),
  addingStringSuccess: makeSelectAddingStringSuccess(),
  addingStringError: makeSelectAddingStringError(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(FormNotification);
