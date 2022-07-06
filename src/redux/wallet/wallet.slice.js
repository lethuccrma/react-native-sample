import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userID: -1,
  ID: -1,
  name: '',
  description: '',
  tokens: [],
  fetching: false,
  fetchError: '',
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    fetchWallet: (state) => ({ ...state, fetching: true }),
    fetchSuccess: (state, action) => ({
      ...action.payload.wallet,
      fetching: false,
      fetchError: '',
    }),
    fetchError: (state, action) => ({
      ...state,
      fetching: false,
      fetchError: action.payload.message,
    }),
  },
});

export default walletSlice;
