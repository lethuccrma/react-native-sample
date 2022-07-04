import { all } from 'redux-saga/effects';
import authSaga from '../auth/auth.saga';

function* rootSaga() {
  yield all([authSaga()]);
}

export default rootSaga;
