import { call, put, takeLatest } from 'redux-saga/effects';
import qs from 'qs';
import moment from 'moment';

import WalletSlice from './wallet.slice';
import APIs, { CryptoPriceAPI } from '../../apis';
import server from '../../configs/server';

function* handleFetchWallet() {
  try {
    // const response = await APIs.get(server.GET_WALLET);
    const response = yield call(APIs.get, server.GET_WALLET);
    const { wallet } = response.data || {};

    wallet.updatedAt = moment();

    const { tokens } = wallet;
    if (tokens && tokens.length > 0) {
      const priceResponses = yield call(CryptoPriceAPI.get, `${server.CRYPTO_PRICE_ROOT_ENDPOINT}?${qs.stringify({
        fsyms: tokens.map((t) => t.symbol).join(','),
        tsyms: 'USD',
      })}`);
      const tokenPrices = priceResponses.data;

      tokens.forEach((token) => {
        // assign directly to wallet
        // eslint-disable-next-line no-param-reassign
        token.pricePerUnit = (tokenPrices[token.symbol] || { USD: 0 }).USD;
      });
    }

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
