/**
 *
 * Tests for NavBar
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { ConnectedRouter } from 'connected-react-router';
import { createMemoryHistory } from 'history';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import NavBar from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';
import configureStore from '../../../configureStore';

describe('<NavBar />', () => {
  let history;
  let store;

  beforeAll(() => {
    history = createMemoryHistory();
    store = configureStore({}, history);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <NavBar />
          </IntlProvider>
        </ConnectedRouter>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <NavBar />
          </IntlProvider>
        </ConnectedRouter>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
