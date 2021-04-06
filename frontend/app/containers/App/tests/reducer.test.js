import produce from 'immer';

import appReducer from '../reducer';
import {
  loadStrings,
  stringsLoaded,
  stringsLoadingError,
  addString,
  stringAdded,
  stringAddingError,
  clearNotifications,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      loading: false,
      error: false,
      strings: false,
      addingString: false,
      addingStringSuccess: false,
      addingStringError: false,
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadStrings action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.strings = false;
    });

    expect(appReducer(state, loadStrings())).toEqual(expectedResult);
  });

  it('should handle the stringsLoaded action correctly', () => {
    const strings = [
      {
        id: 'test-id',
        string: 'test string',
      },
    ];
    const expectedResult = produce(state, draft => {
      draft.strings = strings;
      draft.loading = false;
      draft.error = false;
    });

    expect(appReducer(state, stringsLoaded(strings))).toEqual(expectedResult);
  });

  it('should handle the stringsLoadingError action correctly', () => {
    const err = 'test error';
    const expectedResult = produce(state, draft => {
      draft.error = err;
      draft.loading = false;
      draft.strings = false;
    });

    expect(appReducer(state, stringsLoadingError(err))).toEqual(expectedResult);
  });

  it('should handle the addString action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.addingString = true;
      draft.addingStringSuccess = false;
      draft.addingStringError = false;
    });

    expect(appReducer(state, addString())).toEqual(expectedResult);
  });

  it('should handle the stringAdded action correctly', () => {
    const id = 'test-id';
    const string = 'test string';
    const strings = [{ id, string }];
    const expectedResult = produce(state, draft => {
      draft.strings = strings;
      draft.addingString = false;
      draft.addingStringSuccess = true;
      draft.addingStringError = false;
    });

    expect(appReducer(state, stringAdded(id, string, strings))).toEqual(
      expectedResult,
    );
  });

  it('should handle the addingStringError action correctly', () => {
    const err = 'test error';
    const expectedResult = produce(state, draft => {
      draft.addingStringError = err;
      draft.addingString = false;
      draft.addingStringSuccess = false;
    });

    expect(appReducer(state, stringAddingError(err))).toEqual(expectedResult);
  });

  it('should handle the clearNotifications action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.addingStringError = false;
      draft.addingString = false;
      draft.addingStringSuccess = false;
    });

    expect(appReducer(state, clearNotifications())).toEqual(expectedResult);
  });
});
