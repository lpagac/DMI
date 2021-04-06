/**
 * Test the AddStringPage
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import { AddStringPage, mapDispatchToProps } from '../index';
import { addString, loadStrings } from '../../App/actions';
import configureStore from '../../../configureStore';

describe('<AddStringPage />', () => {
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
          <AddStringPage
            handleAddString={jest.fn()}
            fetchStrings={jest.fn()}
            strings={false}
            loading={false}
            error={false}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('Should render the strings section with current strings', () => {
    const utils = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <AddStringPage
            handleAddString={jest.fn()}
            fetchStrings={jest.fn()}
            strings={[{ id: 'test-id', string: 'test string' }]}
            loading={false}
            error={false}
          />
        </IntlProvider>
      </Provider>,
    );

    const stringList = utils.getByText('test string');
    expect(stringList).not.toEqual(null);
  });

  it('Should render error message if no strings are found', () => {
    const utils = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <AddStringPage
            handleAddString={jest.fn()}
            fetchStrings={jest.fn()}
            strings={false}
            loading={false}
            error={false}
          />
        </IntlProvider>
      </Provider>,
    );

    const stringList = utils.queryByText('test string');
    expect(stringList).toEqual(null);
  });

  describe('mapDispatchToProps', () => {
    describe('handleAddString', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.handleAddString).toBeDefined();
      });

      it('should dispatch addString when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const string = 'newString';
        const id = 'uuid';
        result.handleAddString(id, string);
        expect(dispatch).toHaveBeenCalledWith(addString(id, string));
      });
    });

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
});
