/**
 *
 * AddStringPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import { addString, loadStrings } from 'containers/App/actions';
import {
  makeSelectStrings,
  makeSelectAddingStringSuccess,
  makeSelectAddingStringError,
  makeSelectAddingString,
  makeSelectError,
  makeSelectLoading,
} from 'containers/App/selectors';

import StringsSection from 'components/StringsSection';
import H3 from 'components/H3';
import FormNotification from './FormNotification';
import AddStringForm from './AddStringForm';
import messages from './messages';

const key = 'global';

const AddStringWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 40px 0;
`;
function AddStringPage({
  handleAddString,
  addingString,
  addingStringSuccess,
  addingStringError,
  fetchStrings,
  strings,
  loading,
  error,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (strings === false) fetchStrings();
  }, []);

  const notificationProps = {
    addingString,
    addingStringSuccess,
    addingStringError,
  };

  const stringsSectionProps = {
    loading,
    error,
    strings,
  };

  return (
    <AddStringWrapper>
      <H3>
        <FormattedMessage {...messages.header} />
      </H3>
      <StringsSection {...stringsSectionProps} />
      <FormNotification {...notificationProps} />
      <AddStringForm handleAddString={handleAddString} />
    </AddStringWrapper>
  );
}

AddStringPage.propTypes = {
  handleAddString: PropTypes.func.isRequired,
  addingString: PropTypes.bool.isRequired,
  addingStringSuccess: PropTypes.bool.isRequired,
  addingStringError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  strings: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  fetchStrings: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addingString: makeSelectAddingString(),
  addingStringSuccess: makeSelectAddingStringSuccess(),
  addingStringError: makeSelectAddingStringError(),
  strings: makeSelectStrings(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleAddString: (id, string) => dispatch(addString(id, string)),
    fetchStrings: () => dispatch(loadStrings()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AddStringPage);
