import { all } from 'redux-saga/effects';
import AuthSaga from '../auth/auth.saga';
import WalletSaga from '../wallet/wallet.saga';

function* rootSaga() {
  yield all([AuthSaga(), WalletSaga()]);
}

export default rootSaga;
