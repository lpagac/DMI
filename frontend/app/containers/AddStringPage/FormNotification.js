import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import LoadingIndicator from 'components/LoadingIndicator';
import Notification from 'components/Notification';
import messages from './messages';

function FormNotification({
  addingString,
  addingStringSuccess,
  addingStringError,
}) {
  if (addingString !== false) {
    return <LoadingIndicator />;
  }

  if (addingStringError !== false) {
    const ErrorComponent = () => (
      <Notification success={false}>
        <FormattedMessage {...messages.error} />
      </Notification>
    );
    return <ErrorComponent />;
  }

  if (addingStringSuccess !== false) {
    const SuccessComponent = () => (
      <Notification success>
        <FormattedMessage {...messages.success} />
      </Notification>
    );
    return <SuccessComponent />;
  }

  return null;
}

FormNotification.propTypes = {
  addingString: PropTypes.bool,
  addingStringError: PropTypes.any,
  addingStringSuccess: PropTypes.bool,
};

export default FormNotification;
