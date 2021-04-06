/**
 * Handles fetching all strings and adding new string
 */

import {
  put,
  call,
  takeLatest,
  takeEvery,
  all,
  delay,
} from 'redux-saga/effects';
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

import request from 'utils/request';

const BASE_API_URL = `http://localhost:3001/api/strings`;

/**
 * strings list request/response handler
 */
export function* getStrings() {
  try {
    const resp = yield call(request, BASE_API_URL);
    yield put(stringsLoaded(resp.strings));
  } catch (err) {
    yield put(stringsLoadingError(err));
  }
}

/**
 * watcher for LOAD_STRINGS actions
 */
export function* watchLoadStrings() {
  yield takeLatest(LOAD_STRINGS, getStrings);
}

/** adds new string via post request to server */

export function* addString(action) {
  try {
    const { id, string } = action;
    const options = {
      method: 'POST',
      cache: 'no-cache',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'error',
      body: JSON.stringify({ id, string }),
    };
    const resp = yield call(request, BASE_API_URL, options);
    yield put(stringAdded(id, string, resp.strings));
  } catch (err) {
    yield put(stringAddingError(err.message));
  }
}

/** post new string watcher */

export function* watchAddString() {
  yield takeEvery(ADD_STRING, addString);
}

/** clears adding string notifications */

export function* clearUserNotifications() {
  yield delay(3000);
  yield put(clearNotifications());
}

/** watch for result of addString (success/error) */

export function* watchAddStringNotifications() {
  yield all([
    takeLatest(ADD_STRING_SUCCESS, clearUserNotifications),
    takeLatest(ADD_STRING_ERROR, clearUserNotifications),
  ]);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchLoadStrings(),
    watchAddString(),
    watchAddStringNotifications(),
  ]);
}
