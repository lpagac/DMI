import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import LoadingIndicator from 'components/LoadingIndicator';
import H3 from 'components/H3';
import Ul from './Ul';
import Li from './Li';
import messages from './messages';

function StringsSection({ loading, error, strings }) {
  if (loading) {
    return (
      <div data-testid="loading-indicator">
        <LoadingIndicator data-testid="loading-indicator" />
      </div>
    );
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <H3>
        <FormattedMessage {...messages.error} />
      </H3>
    );
    return <ErrorComponent />;
  }

  if (strings !== false) {
    try {
      return (
        <Ul>
          {strings.map(({ id, string }) => (
            <Li key={id}>{string}</Li>
          ))}
        </Ul>
      );
    } catch (err) {
      return null;
    }
  }

  return null;
}

StringsSection.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  strings: PropTypes.any,
};

export default StringsSection;
