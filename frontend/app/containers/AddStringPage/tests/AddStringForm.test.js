import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { browserHistory } from 'react-router-dom';
import AddStringForm from '../AddStringForm';
import messages from '../messages';
import configureStore from '../../../configureStore';

describe('<AddStringForm />', () => {
  let store;
  let utils;
  let input;
  let submit;
  let handleAddSpy;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  beforeEach(() => {
    handleAddSpy = jest.fn();
    utils = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <AddStringForm handleAddString={handleAddSpy} />
        </IntlProvider>
      </Provider>,
    );
    input = utils.getByTestId('input');
    submit = utils.getByTestId('submit');
  });

  it('should not call handleAddString when there is no input', () => {
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(submit);
    expect(handleAddSpy).not.toHaveBeenCalled();
  });

  it('should display a help message on submit click if no input was submitted', () => {
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(submit);

    const formError = utils.getByTestId('form-error');

    expect(formError.textContent).toEqual(messages.invalidInput.defaultMessage);
  });

  it('should clear help message after 5 seconds', () => {
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(submit);

    setTimeout(() => {
      const formError = utils.queryByTestId('form-error');
      expect(formError).toEqual(null);
    }, 6000);
  });

  it('should call setFormError twice if invalid input', () => {
    const setFormError = jest.fn();
    setFormError.mockReturnValueOnce(true);
    setFormError.mockReturnValueOnce(false);
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(submit);

    setTimeout(() => {
      expect(setFormError).toHaveBeenCalledTimes(2);
    }, 6000);
  });

  it('should call handleAddString on submit if there is valid input', () => {
    fireEvent.change(input, { target: { value: 'test input' } });
    fireEvent.click(submit);
    expect(handleAddSpy).toHaveBeenCalled();
  });
});
