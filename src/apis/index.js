import axios from 'axios';
import server from '../configs/server';
import AuthSlice from '../redux/auth/auth.slice';

const APIs = axios.create({
  baseURL: server.ROOT_ENDPOINT,
  headers: {
    Accept: 'application/json',
  },
});

/* Interceptor */
const responseHandler = (response) => response;

const requestHandler = (request) => {
  request.headers.Authorization = `Bearer ${global.reduxStore.getState().auth.token}`;
  return request;
};

const errorHandler = (error) => {
  if (error.response && error.response.status === 401) {
    // token is invalid
    global.reduxStore.dispatch(AuthSlice.actions.logout());
  }
  return Promise.reject(error);
};

APIs.interceptors.response.use(responseHandler, errorHandler);

APIs.interceptors.request.use(requestHandler, errorHandler);

export const CryptoPriceAPI = axios.create({
  baseURL: server.CRYPTO_PRICE_ROOT_ENDPOINT,
  headers: {
    Accept: 'application/json',
  },
});

export default APIs;
