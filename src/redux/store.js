import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root/root.reducer';
import rootSaga from './root/root.saga';

const sagaMiddleware = createSagaMiddleware();

function configStore(preloadedState) {
  const middlewares = [sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth'],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persistedReducer, preloadedState, composedEnhancers);
  const persistor = persistStore(store);
  return { store, persistor };
}

const initState = {};

const { store, persistor } = configStore(initState);

sagaMiddleware.run(rootSaga);

export { store, persistor };
