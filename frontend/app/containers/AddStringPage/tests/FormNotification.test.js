/**
 * Test the FormNotification
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import { FormNotification } from '../FormNotification';
import configureStore from '../../../configureStore';
import messages from '../messages';

describe('<FormNotification />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <FormNotification
            addingString={false}
            addingStringSuccess={false}
            addingStringError={false}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should show success message when addingStringSuccess is true', () => {
    const utils = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <FormNotification
            addingString={false}
            addingStringError={false}
            addingStringSuccess
          />
        </IntlProvider>
      </Provider>,
    );

    const successMessage = utils.getByText(messages.success.defaultMessage);
    expect(successMessage).not.toEqual(null);
  });

  it('should show error message when addingStringError is true', () => {
    const utils = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <FormNotification
            addingString={false}
            addingStringSuccess={false}
            addingStringError
          />
        </IntlProvider>
      </Provider>,
    );

    const successMessage = utils.queryByText(messages.success.defaultMessage);
    const errorMessage = utils.getByText(messages.error.defaultMessage);
    expect(successMessage).toEqual(null);
    expect(errorMessage).not.toEqual(null);
  });

  it('should show loading indicator when addingString is true', () => {
    const utils = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <FormNotification
            addingString
            addingStringSuccess={false}
            addingStringError={false}
          />
        </IntlProvider>
      </Provider>,
    );

    const successMessage = utils.queryByText(messages.success.defaultMessage);
    const errorMessage = utils.queryByText(messages.error.defaultMessage);
    const loadingIndicator = utils.queryByTestId('loading-indicator');
    expect(successMessage).toEqual(null);
    expect(errorMessage).toEqual(null);
    expect(loadingIndicator).not.toEqual(null);
  });
});
