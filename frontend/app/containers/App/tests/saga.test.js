/**
 * Tests for HomePage sagas
 */

import { put, takeEvery, takeLatest, all } from 'redux-saga/effects';

import {
  LOAD_STRINGS,
  ADD_STRING,
  ADD_STRING_SUCCESS,
  ADD_STRING_ERROR,
} from 'containers/App/constants';
import {
  stringsLoaded,
  stringsLoadingError,
  stringAdded,
  stringAddingError,
  clearNotifications,
} from 'containers/App/actions';

import {
  getStrings,
  watchLoadStrings,
  addString,
  watchAddString,
  clearUserNotifications,
  watchAddStringNotifications,
} from '../saga';

const id = 'test-id';
const string = 'test string';

/* eslint-disable redux-saga/yield-effects */
describe('getStrings Saga', () => {
  let getStringsGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getStringsGenerator = getStrings();

    const selectDescriptor = getStringsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the stringsLoaded action if it requests the data successfully', () => {
    const response = {
      strings: [
        {
          id: 'test-id-1',
          string: 'test string 1',
        },
        {
          id: 'test-id-2',
          string: 'test string 2',
        },
      ],
    };
    const putDescriptor = getStringsGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(stringsLoaded(response.strings)));
  });

  it('should call the stringsLoadingError action if the response errors', () => {
    const response = new Error('test error');
    const putDescriptor = getStringsGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(stringsLoadingError(response)));
  });
});

describe('loadStrings Saga', () => {
  const loadStringsSaga = watchLoadStrings();

  it('should start task to watch for LOAD_STRINGS action', () => {
    const takeLatestDescriptor = loadStringsSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_STRINGS, getStrings));
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('addString Saga', () => {
  let addStringGenerator;

  beforeEach(() => {
    addStringGenerator = addString({ id, string });

    const selectDescriptor = addStringGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the stringAdded action if it requests the data successfully', () => {
    const response = {
      strings: [
        {
          id: 'test-id-1',
          string: 'test string 1',
        },
        {
          id: 'test-id-2',
          string: 'test string 2',
        },
      ],
    };
    const putDescriptor = addStringGenerator.next(response).value;
    expect(putDescriptor).toEqual(
      put(stringAdded(id, string, response.strings)),
    );
  });

  it('should call the stringsLoadingError action if the response errors', () => {
    const response = new Error('test error');
    const putDescriptor = addStringGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(stringAddingError('test error')));
  });
});

describe('addString Saga', () => {
  const addStringSaga = watchAddString();

  it('should start task to watch for ADD_STRING action', () => {
    const takeLatestDescriptor = addStringSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeEvery(ADD_STRING, addString));
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('AddStringNotification Saga', () => {
  let addStringNotificationGenerator;

  beforeEach(() => {
    addStringNotificationGenerator = clearUserNotifications();

    const selectDescriptor = addStringNotificationGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the clearNotifications action', () => {
    const putDescriptor = addStringNotificationGenerator.next().value;
    expect(putDescriptor).toEqual(put(clearNotifications()));
  });
});

describe('watchAddStringNotification Saga', () => {
  const watchAddStringNotificationSaga = watchAddStringNotifications();

  it('should start task to watch for ADD_STRING action', () => {
    const takeLatestDescriptor = watchAddStringNotificationSaga.next().value;
    expect(takeLatestDescriptor).toEqual(
      all([
        takeLatest(ADD_STRING_SUCCESS, clearUserNotifications),
        takeLatest(ADD_STRING_ERROR, clearUserNotifications),
      ]),
    );
  });
});
