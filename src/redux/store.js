import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import productsReducer from './reducers/productsReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['wishlists','carts']
  };
  

// const rootReducer = combineReducers({ produtcsReducer });
const rootReducer = combineReducers({
  productsReducer: persistReducer(persistConfig, productsReducer)
  });

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);