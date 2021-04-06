import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { ConnectedRouter } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import configureStore from '../../../configureStore';

import HomePage from '../index';

describe('<HomePage />', () => {
  it('should render and match the snapshot', () => {
    const history = createMemoryHistory();
    const store = configureStore({}, history);
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <IntlProvider locale="en">
            <HomePage />
          </IntlProvider>
        </ConnectedRouter>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
