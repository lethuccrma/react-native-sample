import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';

import AuthSlice from '../auth/auth.slice';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: ['loginError', 'loginPending'],
};

export default combineReducers({
  auth: persistReducer(authPersistConfig, AuthSlice.reducer),
});
