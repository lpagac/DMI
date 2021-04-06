/**
 *
 * Tests for StringsPage
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { browserHistory } from 'react-router-dom';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import { loadStrings } from '../../App/actions';
import { StringsPage, mapDispatchToProps } from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';
import configureStore from '../../../configureStore';

describe('<StringsPage />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const fetchMock = jest.fn();
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <StringsPage
            loading={false}
            error={false}
            strings={false}
            fetchStrings={fetchMock}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const fetchMock = jest.fn();
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <StringsPage
            loading={false}
            error={false}
            strings={false}
            fetchStrings={fetchMock}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  describe('mapDispatchToProps', () => {
    describe('fetchStrings', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.fetchStrings).toBeDefined();
      });

      it('should dispatch loadStrings when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.fetchStrings();
        expect(dispatch).toHaveBeenCalledWith(loadStrings());
      });
    });
  });

  describe('<StringsSection/>', () => {
    it('should display current strings', () => {
      const fetchMock = jest.fn();
      const utils = render(
        <Provider store={store}>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <StringsPage
              loading={false}
              error={false}
              strings={[{ id: 'test-id', string: 'test string' }]}
              fetchStrings={fetchMock}
            />
          </IntlProvider>
        </Provider>,
      );

      const stringsSection = utils.getByText('test string');
      expect(stringsSection).not.toEqual(null);
    });
  });
});
