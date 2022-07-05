import axios from 'axios';
import server from '../configs/server';
import AuthSlice from '../redux/auth/auth.slice';
import { store } from '../redux/store';

const APIs = axios.create({
  baseURL: server.ROOT_ENDPOINT,
  headers: {
    Accept: 'application/json',
  },
});

/* Interceptor */
const responseHandler = (response) => response;

const requestHandler = (request) => {
  request.headers.Authorization = `Bearer ${store.getState().auth.token}`;
  return request;
};

const errorHandler = (error) => {
  if (error.response && error.response.status === 401) {
    // token is invalid
    store.dispatch(AuthSlice.actions.logout());
  }
  return Promise.reject(error);
};

APIs.interceptors.response.use(responseHandler, errorHandler);

APIs.interceptors.request.use(requestHandler, errorHandler);

export default APIs;
