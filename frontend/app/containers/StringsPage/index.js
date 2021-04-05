/**
 *
 * StringsPage
 *
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import { loadStrings } from 'containers/App/actions';

import {
  makeSelectStrings,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';

import H1 from 'components/H1';
import StringsSection from 'components/StringsSection';
import CenteredSection from './CenteredSection';
import messages from './messages';

const key = 'global';

export function StringsPage({ loading, error, strings, fetchStrings }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (strings === false) fetchStrings();
  }, []);

  const stringsProps = {
    loading,
    error,
    strings,
  };
  return (
    <div>
      <Helmet>
        <title>Strings Page</title>
        <meta name="description" content="All current strings" />
      </Helmet>
      <CenteredSection>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
      </CenteredSection>
      <StringsSection {...stringsProps} />
    </div>
  );
}

StringsPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  strings: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  fetchStrings: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  strings: makeSelectStrings(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    fetchStrings: () => dispatch(loadStrings()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(StringsPage);
