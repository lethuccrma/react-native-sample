import { call, put, takeLatest } from 'redux-saga/effects';

import AuthSlice from './auth.slice';
import APIs from '../../apis';
import server from '../../configs/server';

function* handleStartLogin(action) {
  const { username, password } = action.payload;
  try {
    const response = yield call(APIs.post, server.LOGIN_ENDPOINT, {
      username,
      password,
    });
    const { token, expire } = response.data || {};

    yield put(AuthSlice.actions.loginSuccess({ token, expire }));
  } catch (err) {
    const errorMessage = err.response.data.message || err.message;
    console.log('ERROR', errorMessage);
    yield put(AuthSlice.actions.loginFailed({ message: errorMessage }));
  }
}

export default function* AuthSaga() {
  yield takeLatest(AuthSlice.actions.startLogin, handleStartLogin);
}
