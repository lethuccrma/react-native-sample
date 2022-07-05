import { call, put, takeLatest } from 'redux-saga/effects';

import WalletSlice from './wallet.slice';
import APIs from '../../apis';
import server from '../../configs/server';

function* handleFetchWallet() {
  try {
    const response = yield call(APIs.get, server.GET_WALLET);
    const { wallet } = response.data || {};

    yield put(WalletSlice.actions.fetchSuccess({ wallet }));
  } catch (err) {
    const errorMessage = err.response.data.message || err.message;
    console.log('ERROR', errorMessage);
    yield put(WalletSlice.actions.fetchError({ message: errorMessage }));
  }
}

export default function* WalletSaga() {
  yield takeLatest(WalletSlice.actions.fetchWallet, handleFetchWallet);
}
