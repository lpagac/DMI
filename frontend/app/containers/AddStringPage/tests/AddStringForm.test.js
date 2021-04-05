import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import AddStringPage from '../index';
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
        <AddStringPage onAddString={handleAddSpy} />
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

    expect(formError.textContent).toContain(`Try adding some text!`);
  });

  it('should call handleAddString on submit if there is valid input', () => {
    fireEvent.change(input, { target: { value: 'test input' } });
    fireEvent.click(submit);
    expect(handleAddSpy).toHaveBeenCalled();
  });
});
