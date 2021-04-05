/**
 * Test the AddStringPage
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import AddStringPage, { mapDispatchToProps } from '../index';
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
            addingString={false}
            addingStringSuccess={false}
            addingStringError={false}
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

  it('should fetch the strings on mount if they do not exist', () => {
    const fetchSpy = jest.fn();
    const addSpy = jest.fn();
    const { debug } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <AddStringPage
            handleAddString={addSpy}
            addingString={false}
            addingStringSuccess={false}
            addingStringError={false}
            fetchStrings={fetchSpy}
            strings={false}
            loading={false}
            error={false}
          />
        </IntlProvider>
      </Provider>,
    );
    debug();
    expect(fetchSpy).toHaveBeenCalled();
  });

  it('should not fetch the strings on mount if they do exist', () => {
    const fetchSpy = jest.fn();
    render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <AddStringPage
            handleAddString={jest.fn()}
            addingString={false}
            addingStringSuccess={false}
            addingStringError={false}
            fetchStrings={fetchSpy}
            strings={[]}
            loading={false}
            error={false}
          />
        </IntlProvider>
      </Provider>,
    );

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  // it('should not call handleAddString if input is an empty string', () => {
  //   const submitSpy = jest.fn();
  //   render(
  //     <Provider store={store}>
  //       <IntlProvider locale="en">
  //         <AddStringPage onChangeUsername={() => { }} onSubmitForm={submitSpy} />
  //       </IntlProvider>
  //     </Provider>,
  //   );
  //   expect(submitSpy).not.toHaveBeenCalled();
  // });

  // it('should not call onSubmitForm if username is null', () => {
  //   const submitSpy = jest.fn();
  //   render(
  //     <Provider store={store}>
  //       <IntlProvider locale="en">
  //         <AddStringPage
  //           username=""
  //           onChangeUsername={() => { }}
  //           onSubmitForm={submitSpy}
  //         />
  //       </IntlProvider>
  //     </Provider>,
  //   );
  //   expect(submitSpy).not.toHaveBeenCalled();
  // });

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
