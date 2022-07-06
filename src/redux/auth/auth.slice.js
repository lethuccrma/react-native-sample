import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authenticated: false,
  token: '',
  expire: '',
  loginError: '',
  loginPending: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLogin: () => ({ ...initialState, loginPending: true }),
    loginSuccess: (state, action) => ({
      authenticated: true,
      token: action.payload.token,
      expire: action.payload.expire,
      loginError: '',
      loginPending: false,
    }),
    loginFailed: (state, action) => ({
      ...initialState,
      loginError: action.payload.message,
    }),
    logout: () => initialState,
  },
});

export default authSlice;
